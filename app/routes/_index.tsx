import Tracker from "~/components/tracker";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chord Tracker" },
    { name: "description", content: "Chord Tracker" },
  ];
}

export default function Home() {
  return <div className="flex flex-col items-center justify-center h-screen">
    <Tracker />
  </div>;
}
