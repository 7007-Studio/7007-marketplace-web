"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

interface Tab {
  label: string;
  pathnames: string[];
}

interface TabsProps {
  tabs: Tab[];
}

function Tab({
  isActive = false,
  onClick,
  children,
}: {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      className={clsx("tab", {
        "tab-active": isActive,
      })}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default function Tabs({ tabs }: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="tabs tabs-lg tabs-bordered gap-4">
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          isActive={!!pathname && tab.pathnames.includes(pathname)}
          onClick={() => router.push(tab.pathnames[0])}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}
