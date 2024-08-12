import React from "react";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteJobAction } from "@/utils/actions";

export default function DeleteJobButton({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an error deleting the job",
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast({
        description: "Job deleted successfully",
      });
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
