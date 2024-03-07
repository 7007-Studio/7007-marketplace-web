import Tabs from "@/components/tabs";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: "Collected", pathnames: ["/account/collected", "/account"] },
    { label: "Created", pathnames: ["/account/created"] },
    { label: "Listed", pathnames: ["/account/listed"] },
  ];

  return (
    <div>
      <div className="flex pb-20">
        <Tabs tabs={tabs} />
      </div>
      {children}
    </div>
  );
}
