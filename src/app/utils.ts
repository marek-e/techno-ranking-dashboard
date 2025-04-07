import { TechnoRankingCsvRow } from "./serverUtils";

export function fixRankByDate(
  trends: TechnoRankingCsvRow[],
  date: "2024-09-07" | "2024-11-07" | "2025-02-06" | "2025-04-03"
): { name: string; newRank: number }[] {
  return trends
    .map((trend) => ({
      name: trend.Technology,
      value: trend[date],
    }))
    .sort((a, b) => a.value - b.value)
    .map((trend, index) => ({
      name: trend.name,
      newRank: index + 1,
    }));
}
