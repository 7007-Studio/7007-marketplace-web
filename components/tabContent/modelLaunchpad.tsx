import { useState } from "react";
import Filter from "@/components/filter";
import ModelCard from "@/components/modelCard";
import handleFilterChange from "@/helpers/handleFilterChange";

const ModelLaunchpad = ({ modelIndex }: { modelIndex: number }) => {
  const [statusFilter, setStatusFilter] = useState([
    { id: "launched", label: "Launched", checked: false },
    { id: "pre-launched", label: "Pre-launched", checked: false },
    { id: "launching", label: "Launching", checked: false },
    { id: "token-claim", label: "Token Claim", checked: false },
    { id: "owned-model", label: "Owned Model", checked: false },
  ]);
  const [modelTypeFilter, setModelTypeFilter] = useState([
    { id: "text-to-image", label: "Text-to-Image", checked: false },
    { id: "text-to-music", label: "Text-to-Music", checked: false },
    { id: "text-to-text", label: "Text-to-Text", checked: false },
  ]);
  const [poolTypeFilter, setPoolTypeFilter] = useState([
    { id: "random-pick", label: "Random Pick", checked: false },
    { id: "fixed-price", label: "Fixed Price", checked: false },
    { id: "initial-lp-offering", label: "Initial LP Offering", checked: false },
    { id: "free-launch", label: "Free Launch", checked: false },
  ]);

  return (
    <>
      <div className="pb-8">Display 1 of 1 models</div>
      <div className="flex flex-row gap-x-11 justify-between">
        <div>
          <div className="flex flex-row flex-wrap gap-10">
            <ModelCard modelIndex={modelIndex} />
          </div>
        </div>
        <div className="flex flex-col min-w-[288px] gap-y-8">
          <Filter
            title="Status"
            options={statusFilter}
            onChange={(id) => handleFilterChange(id, setStatusFilter)}
          />
          <Filter
            title="Model Type"
            options={modelTypeFilter}
            onChange={(id) => handleFilterChange(id, setModelTypeFilter)}
          />
          <Filter
            title="Pool Type"
            options={poolTypeFilter}
            onChange={(id) => handleFilterChange(id, setPoolTypeFilter)}
          />
        </div>
      </div>
    </>
  );
};

export default ModelLaunchpad;
