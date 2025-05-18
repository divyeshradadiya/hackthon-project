import { courses, db, moduleProgress, modules } from "..";
import { eq, sql } from "drizzle-orm";

export async function updateModuleProgress(moduleId: string, userId: string, completed: boolean) {
    const progress = await db
        .insert(moduleProgress)
        .values({
            moduleId,
            userId,
            completed,
        })
        .onConflictDoUpdate({
            target: [moduleProgress.moduleId, moduleProgress.userId],
            set: {
                completed,
                lastAccessedAt: new Date(),
            },
        })
        .returning();

    return progress[0];
}

export async function getModuleProgress(moduleId: string, userId: string) {
    const progress = await db
        .select({
            completed: moduleProgress.completed,
            lastAccessedAt: moduleProgress.lastAccessedAt,
        })
        .from(moduleProgress)
        .where(eq(moduleProgress.moduleId, moduleId))
        .then(rows => rows[0]);

    return progress || { completed: false };
}

export async function getUserProgressStats(userId: string) {
    // Get all module progress for the user
    const moduleProgressData = await db
        .select({
            moduleId: moduleProgress.moduleId,
            completed: moduleProgress.completed,
            courseId: modules.courseId,
        })
        .from(moduleProgress)
        .innerJoin(modules, eq(modules.id, moduleProgress.moduleId))
        .where(eq(moduleProgress.userId, userId));

    // Get all courses with their module counts
    const coursesWithModules = await db
        .select({
            courseId: courses.id,
            totalModules: sql<number>`count(${modules.id})`,
        })
        .from(courses)
        .leftJoin(modules, eq(modules.courseId, courses.id))
        .groupBy(courses.id);

    // Calculate statistics
    const completedModules = moduleProgressData.filter(m => m.completed).length;
    
    // Group by courses
    const courseProgress = new Map<string, { completed: number, total: number }>();
    coursesWithModules.forEach(c => {
        courseProgress.set(c.courseId, { completed: 0, total: c.totalModules });
    });

    // Count completed modules per course
    moduleProgressData.forEach(m => {
        if (m.completed && m.courseId) {
            const progress = courseProgress.get(m.courseId);
            if (progress) {
                progress.completed += 1;
            }
        }
    });

    // Calculate final statistics
    const completedCourses = Array.from(courseProgress.values())
        .filter(p => p.completed === p.total && p.total > 0).length;
    const coursesPlayed = courseProgress.size;
    
    const avgCompletion = coursesPlayed > 0
        ? Array.from(courseProgress.values())
            .reduce((acc, curr) => acc + (curr.completed / curr.total), 0) / coursesPlayed
        : 0;

    return {
        completedModules,
        completedCourses,
        coursesPlayed,
        avgCourseCompletion: Math.round(avgCompletion * 100) / 100,
    };
}


