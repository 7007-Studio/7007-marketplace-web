import axios from "axios";

const generateMusic = async (contractAddr: string, prompt: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DALLE_HOST}/txt2music`,
      { contractAddress: contractAddr, prompt: prompt },
      { timeout: 300000 }
    );
    return "data:audio/mpeg;base64," + response.data;
  } catch (error) {
    console.error(error);
  }
};

export default generateMusic;
