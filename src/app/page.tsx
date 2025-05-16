import { Hero } from '@/components/Hero';
import  Banner from '@/components/Banner';
import  Gallery from '@/components/Gallery';
import { DataSharingGuidance } from "@/components/LinkList/DataSharingGuidance";
import {DataSharingProcess} from "@/components/DataProcessing";
import {DataSharingResources} from "@/components/Resources";


export default async function Home() {
  return <HomeContent/>;
}

function HomeContent() {
  return (
    <main>
      <Hero />
      <Banner />
      <Gallery />
      <DataSharingGuidance />
      <DataSharingProcess />
      <DataSharingResources />
    </main>
  );
}
