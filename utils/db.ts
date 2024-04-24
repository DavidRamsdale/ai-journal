import { PrismaClient } from "@prisma/client";

// To prevent hot reloading from creating multiple instances of PrismaClient, we store it in a global variable

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
