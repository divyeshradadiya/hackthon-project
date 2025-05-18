import { db, moduleProgress } from "..";
import { eq } from "drizzle-orm";

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