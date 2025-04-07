import { getTrendsData } from "./serverUtils";
import { fixRankByDate } from "./utils";

export default async function Home() {
  const trends = await getTrendsData();
  const t1 = fixRankByDate(trends, "2024-09-07");
  const t2 = fixRankByDate(trends, "2024-11-07");
  const t3 = fixRankByDate(trends, "2025-02-06");
  const t4 = fixRankByDate(trends, "2025-04-03");

  const formattedTrends = trends.map((trend) => {
    const t1Rank = t1.find((t) => t.name === trend.Technology)?.newRank ?? 0;
    const t2Rank = t2.find((t) => t.name === trend.Technology)?.newRank ?? 0;
    const t3Rank = t3.find((t) => t.name === trend.Technology)?.newRank ?? 0;
    const t4Rank = t4.find((t) => t.name === trend.Technology)?.newRank ?? 0;

    return {
      name: trend.Technology,
      "2024-09-07": t1Rank,
      "2024-11-07": t2Rank,
      "2025-02-06": t3Rank,
      "2025-04-03": t4Rank,
      min: Math.min(t1Rank, t2Rank, t3Rank, t4Rank),
      max: Math.max(t1Rank, t2Rank, t3Rank, t4Rank),
    };
  });

  return (
    <main className="p-4 bg-amber-50">
      <h1 className="text-2xl font-bold text-center mb-4">
        Technology Evolution Trends
      </h1>
      <div className="flex gap-2 bg-white p-4 rounded-lg">
        <div className="flex flex-col gap-2 w-1/3">
          <h2 className="text-lg font-bold">Technologies</h2>
          <pre>{JSON.stringify(formattedTrends, null, 2)}</pre>
        </div>
        <div className="border-l-2 border-gray-200 h-auto w-1" />
        <h2 className="text-lg font-bold">Graph</h2>
      </div>
    </main>
  );
}
