import { TechnoSelection } from "./components/TechnoSelection";
import { getTrendsData } from "./serverUtils";
import { fixRankByDate, stringToColor } from "./utils";

export type Trend = {
  name: string;
  "2024-09-07": number;
  "2024-11-07": number;
  "2025-02-06": number;
  "2025-04-03": number;
  min: number;
  max: number;
  range: number;
  color: string;
  selected: boolean;
};

export default async function Home() {
  const trends = await getTrendsData();
  const t1 = fixRankByDate(trends, "2024-09-07");
  const t2 = fixRankByDate(trends, "2024-11-07");
  const t3 = fixRankByDate(trends, "2025-02-06");
  const t4 = fixRankByDate(trends, "2025-04-03");

  const formattedTrends: Trend[] = trends.map((trend) => {
    const t1Rank = t1.find((t) => t.name === trend.Technology)?.newRank ?? 0;
    const t2Rank = t2.find((t) => t.name === trend.Technology)?.newRank ?? 0;
    const t3Rank = t3.find((t) => t.name === trend.Technology)?.newRank ?? 0;
    const t4Rank = t4.find((t) => t.name === trend.Technology)?.newRank ?? 0;

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

  return (
    <main className="p-4 bg-amber-50">
      <h1 className="text-2xl font-bold text-center mb-4">
        Technology Evolution Trends
      </h1>
      <TechnoSelection formattedTrends={formattedTrends} />
    </main>
  );
}
