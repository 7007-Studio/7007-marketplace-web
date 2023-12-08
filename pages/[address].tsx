import { Inter } from "next/font/google";
import Tabs from "@/components/tabs";
import Card from "@/components/card";
import Link from "next/link";
import ModelDetail from "@/components/modelDetail";

const inter = Inter({ subsets: ["latin"] });

export default function Detail() {
  const items = [1, 2, 3];

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Link href="/">Back</Link>
      <ModelDetail />
    </main>
  );
}
