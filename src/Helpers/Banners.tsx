import fs from "fs/promises";
import { Sumr } from "../Types/Sumrs";
type bannerToMax = {
  [key: string]: number;
};
const bannerToMax: bannerToMax = {
  Fintech: 17,
  Funding: 12,
  AI: 58,
  "M&A": 8,
  Startups: 12,
  Cybersecurity: 14,
  Robotics: 25,
  Crypto: 6,
  Transportation: 8,
  Consumer: 16,
  Regulations: 6,
};

const availableCategories = [
  "Fintech",
  "Funding",
  "AI",
  "M&A",
  "Startups",
  "Cybersecurity",
  "Robotics",
  "Crypto",
  "Transportation",
  "Consumer",
  "Regulations",
];

function getHash(input: string) {
  var hash = 0,
    len = input.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  if (hash < 0) {
    hash = hash * -1;
  }
  return hash;
}

export function getSumrBanner(sumr: Sumr): string {
  let cat;
  for (let _tag of sumr.tag) {
    cat = availableCategories.find((c) => c.includes(_tag));
    if (cat) {
      cat = cat;
      break;
    }
  }
  if (cat) {
    let rand = getHash(sumr._id) % bannerToMax[cat];
    return `/assets/banners/${cat?.replace("&", "_")}/${rand}.jpg`;
  }
  return "";
}
