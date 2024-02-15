import { AIGCContent } from "@/components/formAIGC/formAIGC";
import generateImage from "./generateImage";
import initOPML, { GenerateType } from "./initOPML";

const generateAigcContent = async (
  name: string,
  prompt: string
): Promise<AIGCContent> => {
  let contractAddr = await initOPML(GenerateType.Image, prompt);
  const imageUrl = await generateImage(contractAddr, prompt);

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
