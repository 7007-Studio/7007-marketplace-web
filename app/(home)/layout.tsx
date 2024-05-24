"use client";
import Tabs from "@/components/ui/tabs";
import { ModelIndex } from "@/constants/constants";
import { ModelList } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modelList, setModelList] = useState<ModelList[]>([]);
  const handleFetchData = async () => {
    try {
      const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?status=Done&action=train`;

      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      const filteredData = data.filter((item: any) => item.status === "Done");

      setModelList(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <div className="h-[50vh] flex flex-col relative items-center justify-center gap-5">
        {/* <Image
          src="/homeMask.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0"
        /> */}
        <p className="text-[30px] font-bold z-10">
          AI Inference Asset Protocol
        </p>
        <Link
          href={`/collection/0`}
          className="border bg-black/40 h-[50px] w-[248px] flex items-center justify-center rounded-3xl z-10 text-white/80 hover:text-white/60 cursor-pointer"
        >
          Mint Now
        </Link>
      </div>
      <div className="h-full w-full flex justify-center flex-col items-center">
        {children}
      </div>
    </>
  );
}
