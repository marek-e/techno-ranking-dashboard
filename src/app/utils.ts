import { DATA } from "./data";
import { TechnoRankingCsvRow, Trend } from "./page";

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

export function getTrendsData(): Trend[] {
  const data = DATA;
  const t1 = fixRankByDate(data, "2024-09-07");
  const t2 = fixRankByDate(data, "2024-11-07");
  const t3 = fixRankByDate(data, "2025-02-06");
  const t4 = fixRankByDate(data, "2025-04-03");

  const formattedTrends: Trend[] = data.map((trend) => {
    const t1Rank = t1.find((t) => t.name === trend.Technology)!.newRank;
    const t2Rank = t2.find((t) => t.name === trend.Technology)!.newRank;
    const t3Rank = t3.find((t) => t.name === trend.Technology)!.newRank;
    const t4Rank = t4.find((t) => t.name === trend.Technology)!.newRank;

    const min = Math.min(t1Rank, t2Rank, t3Rank, t4Rank);
    const max = Math.max(t1Rank, t2Rank, t3Rank, t4Rank);
    const range = max - min;

    return {
      name: trend.Technology,
      "2024-09-07": t1Rank,
      "2024-11-07": t2Rank,
      "2025-02-06": t3Rank,
      "2025-04-03": t4Rank,
      min,
      max,
      range,
      color: stringToColor(trend.Technology),
      selected: false,
    };
  });

  return formattedTrends;
}
