import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

export function checkForFirstStart() {
  const DEFAULT = {
    PRIVATE_KEY: "",
    TOKEN_IDS: [""],
  };
  const PATH = join(cwd() + "/config.json");

  if (!existsSync(PATH)) {
    console.log(
      "First start detected. Creating config. Please add your private key. For further assistance check the Github at"
    );
    console.log("https://https://github.com/0xIcey/Autobahn-Network-Script");
    writeFileSync(PATH, JSON.stringify(DEFAULT).replace('{"', '{\n"').replace(',', ',\n').replace(']', ']\n')); //The things you do for user experience
    process.exit(0);
  }

  const content = readFileSync(PATH)
  
  return JSON.parse(content.toString('utf-8'));
}
