import axios from "axios";

const generateImage = async (contractAddr: string, prompt: string) => {
  try {
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_DALLE_HOST}/txt2img`,
      { contractAddress: contractAddr, prompt: prompt },
      { timeout: 300000 }
    );
    return "data:image/png;base64," + response.data;
  } catch (error) {
    console.error(error);
  }
};

export default generateImage;
