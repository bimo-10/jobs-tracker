"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Button } from "./ui/button";

export default function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="capitalize font-semibold text-4xl mb-6">Add Job</h2>
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

          <Button type="submit" className="self-end capitalize">
            Create Job
          </Button>
        </div>
      </form>
    </Form>
  );
}
