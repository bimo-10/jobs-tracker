import { auth } from "@clerk/nextjs";
import prisma from "./db";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import { redirect } from "next/navigation";

function authenticateAndRedirect(): string {
  const { userId } = auth();

  if (!userId) redirect("/");

  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();

  try {
    createAndEditJobSchema.parse(values);

    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}
