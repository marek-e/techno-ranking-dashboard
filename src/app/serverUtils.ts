"use server";
import * as fs from "fs";
import * as path from "path";

import { parse } from "@fast-csv/parse";

export interface TechnoRankingCsvRow {
  Technology: string;
  "2024-09-07": string;
  "2024-11-07": string;
  "2025-02-06": string;
  "2025-04-03": string;
}

export async function getTrendsData(): Promise<TechnoRankingCsvRow[]> {
  return new Promise((resolve, reject) => {
    const data: TechnoRankingCsvRow[] = [];

    fs.createReadStream(path.resolve("public", "trends.csv"))
      .pipe(parse({ headers: true }))
      .on("error", reject)
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data));
  });
}
