"use client";

import { useState } from "react";
import { Trend } from "../page";
import LinearChart from "./LinearChart";

export function TechnoSelection({
  formattedTrends,
}: {
  formattedTrends: Trend[];
}) {
  const [trends, setTrends] = useState<Trend[]>(formattedTrends);

  const handleChange = (trend: Trend) => {
    setTrends((prev) =>
      prev.map((t) =>
        t.name === trend.name ? { ...t, selected: !t.selected } : t
      )
    );
  };

  return (
    <div className="flex gap-2 bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2 w-1/3">
        <h2 className="text-lg font-bold">Technologies</h2>
        <div className="flex gap-2">
          <button
            className={`bg-amber-500 text-amber-950 px-4 py-2 rounded-md ${
              trends.every((t) => t.selected) ? "opacity-50" : "cursor-pointer "
            }`}
            onClick={() =>
              setTrends((prev) =>
                prev.map((t) => ({ ...t, selected: !t.selected }))
              )
            }
            disabled={trends.every((t) => t.selected)}
          >
            Select All
          </button>
          <button
            className={`bg-amber-500 text-amber-950 px-4 py-2 rounded-md  ${
              trends.every((t) => !t.selected) ? "opacity-50" : "cursor-pointer"
            }`}
            onClick={() =>
              setTrends((prev) => prev.map((t) => ({ ...t, selected: false })))
            }
            disabled={trends.every((t) => !t.selected)}
          >
            Deselect All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {trends
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((trend) => trend.selected)
            .map((trend) => (
              <div
                key={trend.name}
                className="flex gap-2 items-center"
                style={{
                  color: trend.color,
                }}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={true}
                  onChange={() => handleChange(trend)}
                />
                <span>{trend.name}</span>
              </div>
            ))}
          {trends
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((trend) => !trend.selected)
            .map((trend) => (
              <div
                key={trend.name}
                className="flex gap-2 items-center"
                style={{
                  color: trend.color,
                }}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={false}
                  onChange={() => handleChange(trend)}
                />
                <span>{trend.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="border-l-2 border-gray-200 h-auto w-1" />
      <div className="flex gap-2 w-2/3">
        <LinearChart trends={trends.filter((t) => t.selected)} />
      </div>
    </div>
  );
}
