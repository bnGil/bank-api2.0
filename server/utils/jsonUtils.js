import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../db");

export const loadJson = (fileName) => {
  try {
    const dataBuffer = fs.readFileSync(`${dbPath}/${fileName}.json`);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};
// loadJson("users");

export const saveJson = (newData, fileName) => {
  const newDataJSON = JSON.stringify(newData);
  fs.writeFileSync(`${dbPath}/${fileName}.json`, newDataJSON);
};

export const isExist = (id, fileName) => {
  const data = loadJson(fileName);
  const idx = data.findIndex((obj) => obj.id === id);
  return idx === -1 ? false : true;
};
// isExist("a1", "users");
