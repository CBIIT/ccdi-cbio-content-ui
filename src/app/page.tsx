import { DatasetProcessingInfo } from "@/components/datasets/DatasetProcessingInfo";

export default async function Home() {
  return <HomeContent/>;
}

function HomeContent() {
  return (
    <main>
      <DatasetProcessingInfo />
    </main>
  );
}
