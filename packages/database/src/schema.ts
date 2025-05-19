import { relations } from "drizzle-orm";
import { unique } from "drizzle-orm/pg-core";
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// Courses table
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  learningInput: text("learning_input").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Modules table
export const modules = pgTable("modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Progress tracking table
export const moduleProgress = pgTable(
  "module_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 255 }).notNull(),
    completed: boolean("completed").notNull().default(false),
    lastAccessedAt: timestamp("last_accessed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    moduleUserUnique: unique().on(table.moduleId, table.userId),
  })
);
// Relations
export const courseRelations = relations(courses, ({ many }) => ({
  modules: many(modules),
}));

export const moduleRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  progress: many(moduleProgress),
}));

export const moduleProgressRelations = relations(moduleProgress, ({ one }) => ({
  module: one(modules, {
    fields: [moduleProgress.moduleId],
    references: [modules.id],
  }),
}));
