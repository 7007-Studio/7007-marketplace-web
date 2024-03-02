import { AIGCContent } from "@/components/formAIGC";
import generateImage from "./generateImage";
import initOPML, { GenerateType } from "./initOPML";

const generateAigcContent = async (
  name: string,
  prompt: string,
  seed: number
): Promise<AIGCContent> => {
  // let contractAddr = await initOPML(GenerateType.Image, prompt);
  const imageUrl = `https://gateway.pinata.cloud/ipfs/${await generateImage("", prompt, seed)}`;

  // audio generation takes too long, pause for now
  // contractAddr = await initOPML(GenerateType.Music, data.prompt);
  // const audioUrl = await generateMusic(contractAddr, data.prompt);
  // if (audioUrl) {
  //   setValue("audioUrl", audioUrl);
  // }

  return {
    name,
    prompt,
    imageUrl,
    // audioUrl
  };
};

export default generateAigcContent;
