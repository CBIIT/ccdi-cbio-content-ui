import { DatasetAndReleaseNotes } from "@/components/DatasetAndReleaseNotes";

export default async function Home() {
  return <HomeContent/>;
}

function HomeContent() {
  return (
    <main>
      <DatasetAndReleaseNotes />
    </main>
  );
}
