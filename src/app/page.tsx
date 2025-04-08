"use client";
import { TechnoSelection } from "./components/TechnoSelection";
import { fixRankByDate, stringToColor } from "./utils";

import Papa from "papaparse";
import { useEffect, useState } from "react";

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

export interface TechnoRankingCsvRow {
  Technology: string;
  "2024-09-07": string;
  "2024-11-07": string;
  "2025-02-06": string;
  "2025-04-03": string;
}

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/trends.csv");
        if (!res.ok) {
          throw new Error("Failed to fetch CSV file");
        }
        const csvText = await res.text();
        console.log("🚀 ~ fetchData ~ csvText:", csvText);

        const { data } = Papa.parse<TechnoRankingCsvRow>(csvText, {
          header: true,
        });
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

        setTrends(formattedTrends);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-4 bg-amber-50">
      <h1 className="text-2xl font-bold text-center mb-4">
        Technology Evolution Trends
      </h1>
      <TechnoSelection trends={trends} setTrends={setTrends} />
    </main>
  );
}
