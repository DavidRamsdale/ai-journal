import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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

  redirect("/journal");
};

const NewUser: React.FC = async () => {
  await createUser();
  return <div>...loading</div>;
};

export default NewUser;
