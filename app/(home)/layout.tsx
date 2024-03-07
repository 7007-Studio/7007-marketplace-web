import Tabs from "@/components/ui/tabs";
import { ModelIndex } from "@/constants";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: "Models", pathnames: ["/model", "/"] },
    { label: "ERC-7007", pathnames: ["/erc-7007"] },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center p-20">
        <h1 className="heading-lg pb-4">
          This is a banner for on going model launch
        </h1>
        <p className="text-lg pb-20">Model description</p>
        <Link
          href={`/collection/${ModelIndex}/mint`}
          className="btn btn-primary btn-lg w-full max-w-sm"
        >
          Mint
        </Link>
      </div>
      <div>
        <div className="flex pb-20">
          <Tabs tabs={tabs} />
        </div>
        {children}
      </div>
    </>
  );
}
