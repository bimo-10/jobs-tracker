import { getChartsDataAction, getStatsAction } from "@/utils/actions";
import React from "react";

export default async function StatsPage() {
  const stats = await getStatsAction();
  const charts = await getChartsDataAction();
  // console.log(stats);
  // console.log(charts);
  return <div>StatsPage</div>;
}
