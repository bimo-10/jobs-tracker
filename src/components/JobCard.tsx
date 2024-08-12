import { JobType } from "@/utils/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobButton from "./DeleteJobBtn";

export default function JobCard({ job }: { job: JobType }) {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/job/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobButton />
      </CardFooter>
    </Card>
  );
}
