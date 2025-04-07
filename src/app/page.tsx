import { getTrendsData } from "./serverUtils";

export default async function Home() {
  const trends = await getTrendsData();

  return (
    <main className="p-4 bg-amber-50">
      <h1 className="text-2xl font-bold text-center mb-4">
        Technology Evolution Trends
      </h1>
      <div className="flex gap-2 bg-white p-4 rounded-lg">
        <div className="flex flex-col gap-2 w-1/3">
          <h2 className="text-lg font-bold">Technologies</h2>
          <pre>{JSON.stringify(trends, null, 2)}</pre>
        </div>
        <div className="border-l-2 border-gray-200 h-auto w-1" />
        <h2 className="text-lg font-bold">Graph</h2>
      </div>
    </main>
  );
}
