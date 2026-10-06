import type { Metadata } from "next";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hadi Mourad - Resume",};

export default function ResumePage() {
  return (
    <main className="m-0 h-screen w-screen overflow-hidden p-0">
      <iframe src={profile.resume} title="Hadi Mourad - Resume" className="block h-full w-full border-0" />
    </main>
  );
}
