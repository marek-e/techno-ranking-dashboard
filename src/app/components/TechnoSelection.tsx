"use client";

import { useState } from "react";
import { Trend } from "../page";
import LinearChart from "./LinearChart";
import debounce from "lodash.debounce";

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

  const handleMinRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrends(
      formattedTrends.map((t) => ({
        ...t,
        selected: t.range > Number(e.target.value),
      }))
    );
  };
  return (
    <div className="flex gap-2 bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-3 w-1/3">
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
        <div className="flex gap-2 items-center">
          <label htmlFor="min-rank-change" className="text-lg font-medium">
            Min rank change
          </label>
          <input
            type="number"
            id="min-rank-change"
            placeholder="Search"
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={debounce(handleMinRankChange, 600)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {trends
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((trend) => trend.selected)
            .map((trend) => (
              <div
                key={trend.name}
                className="flex gap-2 items-center cursor-pointer"
                style={{
                  color: trend.color,
                }}
                onClick={() => handleChange(trend)}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={true}
                  readOnly
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
                className="flex gap-2 items-center cursor-pointer"
                style={{
                  color: trend.color,
                }}
                onClick={() => handleChange(trend)}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={false}
                  readOnly
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
