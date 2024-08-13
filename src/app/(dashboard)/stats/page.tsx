import ChartsContainer from "@/components/ChartsContainer";
import StatsContainer from "@/components/StatsContainer";
import { getChartsDataAction, getStatsAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function StatsPage() {
  // const stats = await getStatsAction();
  // const charts = await getChartsDataAction();
  // console.log(stats);
  // console.log(charts);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
}
