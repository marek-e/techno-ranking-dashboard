"use server";
import * as fs from "fs";
import * as path from "path";

import { parse } from "@fast-csv/parse";

interface TechnoRankingCsvRow {
  name: string;
  "2024-09-07": number;
  "2024-11-07": number;
  "2025-02-06": number;
  "2025-04-03": number;
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
