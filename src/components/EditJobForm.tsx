"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useToast } from "./ui/use-toast";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Button } from "./ui/button";

export default function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),

    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an error updating the job",
        });
        return;
      }

      toast({
        description: "Job updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      router.push("/jobs");
    },
  });

  // 1. Define your form
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  // 2. Define your handler
  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Edit Job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Position */}
          <CustomFormField name="position" control={form.control} />
          {/* Company */}
          <CustomFormField name="company" control={form.control} />
          {/* Location */}
          <CustomFormField name="location" control={form.control} />
          {/* Job Status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="Job Status"
            items={Object.values(JobStatus)}
          />
          {/* Job Mode */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="Job Mode"
            items={Object.values(JobMode)}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Edit Job"}
        </Button>
      </form>
    </Form>
  );
}
