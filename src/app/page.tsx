import { getTrendsData } from "./serverUtils";

export default async function Home() {
  const trends = await getTrendsData();

  return (
    <main>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(trends, null, 2)}</pre>
    </main>
  );
}
