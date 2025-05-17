import { db } from "@repo/database";
import { users } from "@repo/database";

export async function getUsers() {
  const allUsers = await db.select().from(users);
  return allUsers;
}

export async function createUser({ name, email }: { name: string; email: string }) {
  const newUser = await db.insert(users).values({
    name,
    email,
  }).returning();
  return newUser[0];
}
