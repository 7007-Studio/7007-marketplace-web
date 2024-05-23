import { ModelDetail } from "@/types";
import OPLogo from "@/components/assets/OPLogo.jpeg";
import SDLogo from "@/components/assets/SDLogo.jpeg";

export const ModelIndex = 1n;

export const NATIVE_TOKEN_ADDRESS =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const modelData: ModelDetail[] = [
  {
    id: "0",
    action: "launched",
    modelAuthorID: "1",
    modelName: "Stable Diffusion",
    status: "active",
    NFTContract: "0x530511810d56157D50E2D215aE4fC9bC9b57df02",
    openSeaName: "stable-diffusion-20",
    description:
      "Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.",
    type: "Text-To-Image",
    logo: SDLogo.src,
  },
  {
    id: "1",
    action: "launched",
    modelAuthorID: "1",
    modelName: "OpenLM",
    status: "active",
    NFTContract: "0x0882203E8E4Df9119231897cfA386f7b8965a5f8",
    openSeaName: "openlm-5",
    description:
      "OpenLM is a latent text-to-text diffusion model capable of generating photo-realistic images given any text input.",
    type: "Text-To-Text",
    logo: OPLogo.src,
  },
];

export const socialLink = [
  { id: "Telegram", link: "https://t.me/+wUoA1zKgUBIzYzJl" },
  { id: "X", link: "https://twitter.com/Lab7007" },
];
export const footerList = [
  {
    id: "LaunchApp",
    name: "🚀 launch app",
    link: "https://alpha.7007.studio",
  },
  {
    id: "Telegram",
    name: "👾 Telegram",
    link: "https://t.me/+wUoA1zKgUBIzYzJl",
  },
  {
    id: "X",
    name: "🌏 x",
    link: "https://x.com/7007_studio?s=21&t=guauv9-D5cfkAcgT98UKWQ",
  },
  { id: "About", name: "🐳 about", link: "#About" },
  { id: "Products", name: "🌵 products", link: "#Products" },
  {
    id: "Contact",
    name: "🗿 contact",
    link: "https://8ksjs0r1jhj.typeform.com/to/j2EGDUJC",
  },
  // {
  //   id: "Contract",
  //   name: "⛽ smart contract",
  //   link: "https://eips.ethereum.org/EIPS/eip-7007",
  // },
  {
    id: "whitePaper",
    name: "🩻 white paper",
    link: "https://ipfs.io/ipfs/QmY5kxVorYHfAdoM3MLgqmEdeCZzCrh8wnZLdm6Nijzuyx",
  },
  // { id: "IMO", name: "⛲ imo" },
];
