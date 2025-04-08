"use client";
import LinearChart from "./components/LinearChart";
import { TechnoSelection } from "./components/TechnoSelection";
import { getTrendsData } from "./utils";

import { useState } from "react";

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
  const formattedTrends = getTrendsData();
  const [trends, setTrends] = useState<Trend[]>(formattedTrends);

  return (
    <main className="p-4 bg-amber-50">
      <h1 className="text-2xl font-bold text-center mb-4">
        Technology Evolution Trends
      </h1>
      <div className="flex gap-2 bg-white p-4 rounded-lg">
        <TechnoSelection trends={trends} setTrends={setTrends} />
        <div className="border-l-2 border-gray-200 h-auto w-1" />
        <div className="flex gap-2 w-2/3">
          <LinearChart trends={trends.filter((t) => t.selected)} />
        </div>
      </div>
    </main>
  );
}
