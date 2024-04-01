import Tabs from "@/components/ui/tabs";
import Table from "@/components/ui/table";
import BasicTrading from "@/components/ui/basic-trading";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [ 
    { label: "DASHBOARD", pathnames: ["/account/collected", "/account"] },
    { label: "TOKEN TRADING", pathnames: ["/account/created"] },
  ];

  return (
    <div>
      <div className="flex pb-5">
        <Tabs tabs={tabs} />
      </div>
      <BasicTrading />
      <div>
        <p className="py-5">TRANDING DASHBOARD</p>
        
        <Table />
      </div>
      {children}
    </div>
  );
}
