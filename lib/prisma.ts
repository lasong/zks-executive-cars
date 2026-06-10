import path from "node:path";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Turbopack bundles the generated client away from its source location, which breaks
// its built-in __dirname-relative resolution of the SQLite file path. Resolve it
// ourselves relative to the project root instead.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: `file:${path.join(process.cwd(), "prisma", "dev.db")}`,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
