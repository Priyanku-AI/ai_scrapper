import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  question: text("question").notNull(),
  status: text("status").notNull().default("pending"),
  answer: text("answer"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
