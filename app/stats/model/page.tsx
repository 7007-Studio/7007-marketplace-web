import ModelCard from "@/components/modelCard";
import { ModelIndex } from "@/constants";

export default function HomeModel() {
  return (
    <div className="flex flex-row flex-wrap gap-6 items-start">
      <ModelCard modelIndex={ModelIndex} />
    </div>
  );
}
