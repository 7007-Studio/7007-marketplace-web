import { fetchData } from "@/components/formAIGC/ipfsHelper";
import axios from "axios";

const generateImage = async (
  contractAddr: string,
  prompt: string,
  seed: number
) => {
  try {
    let response = await axios.post(
      `/api/txt2img`,
      { prompt: prompt, seed: seed },
      { timeout: 300000, headers: { "Content-Type": "application/json" } }
    );

    return response.data;

    // const image = await fetchData(response.data);
    // console.log(image);
    // return image;
  } catch (error) {
    console.error(error);
  }
};

export default generateImage;
