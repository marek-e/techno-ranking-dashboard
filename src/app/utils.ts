import { TechnoRankingCsvRow } from "./serverUtils";

export function fixRankByDate(
  trends: TechnoRankingCsvRow[],
  date: "2024-09-07" | "2024-11-07" | "2025-02-06" | "2025-04-03"
): { name: string; newRank: number }[] {
  const trendsSorted = trends
    .map((trend) => {
      const value = parseInt(trend[date]);
      return {
        name: trend.Technology,
        value: Number.isNaN(value) ? Infinity : value,
      };
    })
    .toSorted((a, b) => a.value - b.value);

  return trendsSorted.map((trend, index) => ({
    name: trend.name,
    newRank: index + 1,
  }));
}

export function stringToColor(str: string) {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
}
