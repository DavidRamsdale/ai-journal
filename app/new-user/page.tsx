import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const createUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }
};

const NewUser: React.FC = async () => {
  await createUser();
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to my page.</p>
    </div>
  );
};

export default NewUser;
