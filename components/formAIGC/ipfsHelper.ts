import { create } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export async function getTokenURI(
  modelName: string,
  name: string,
  prompt: string,
  imageUrl?: string,
  audio?: string
) {
  // make an mp4 with the photo and audio
  let ipfsLinkImg;
  let result;
  if (imageUrl) {
    let response = await fetch(imageUrl);
    let blob = await response.blob();
    let file = new File([blob], "file.png", { type: "image/png" });
    result = await ipfsClient.add(file);
    ipfsLinkImg = "https://cloudflare-ipfs.com/ipfs/" + result.path;
  }

  const metadata = {
    name,
    description:
      "This NFT is generated and verified with OPML on https://demo.7007.studio/. The model used is Stable Diffusion and MusicGen. The original prompt is: " +
      prompt,
    image: ipfsLinkImg,
    external_url: "https://alpha.7007.studio/",
    attributes: [
      {
        trait_type: "prompt",
        value: prompt,
      },
      {
        trait_type: "model",
        value: modelName,
      },
    ],
  };

  let buffer = Buffer.from(JSON.stringify(metadata));
  result = await ipfsClient.add(buffer);

  const ipfsLinkMetadata = "https://cloudflare-ipfs.com/ipfs/" + result.path;
  return { ipfsLinkMetadata, metadata };
}

export async function fetchData(hash: string) {
  const data = [];
  for await (const file of ipfsClient.get(hash)) {
    data.push(file);
  }
  const buffer = Buffer.concat(data);
  const base64String = buffer.toString("base64");
  return `data:image/png;base64,${base64String}`;
}
