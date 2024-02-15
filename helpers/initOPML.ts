import axios from "axios";

export enum GenerateType {
  Image,
  Music,
}

const initOPML = async (type: GenerateType, prompt: string) => {
  let error;
  try {
    let response, data;
    if (type === GenerateType.Image) {
      data = {
        modelName: "StableDiffusion",
        prompt: prompt,
      };

      response = await axios.post(
        `${process.env.NEXT_PUBLIC_DALLE_HOST}/opMLRequest`,
        data,
        {
          timeout: 300000,
        }
      );
    } else if (type === GenerateType.Music) {
      data = {
        modelName: "MusicGen",
        prompt: prompt,
      };
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_DALLE_HOST}/opMLRequest`,
        data,
        {
          timeout: 300000,
        }
      );
    }
    return response?.data.MPChallenge;
  } catch (error) {
    console.error(error);
  }
};

export default initOPML;
