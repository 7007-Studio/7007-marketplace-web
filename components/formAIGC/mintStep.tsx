import { AIGCContent } from "./formAIGC";

interface MintStepProps {
  metadata: AIGCContent;
}

const MintStep = ({ metadata }: MintStepProps) => {
  return (
    <div>
      <div>Modal A</div>
      <img src={metadata.imageUrl} />
      <div>{metadata.name}</div>
      <div>{metadata.prompt}</div>
      <div>
        <button className="btn btn-secondary">Regenerate</button>
        <button className="btn btn-primary">Mint for 0.001eth</button>
      </div>
    </div>
  );
};

export default MintStep;
