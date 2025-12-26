import fs from "fs";
import path from "path";
import { HumanCorrection } from "../types/humanCorrection";
import { learnFromHuman } from "./learnFromHuman";

export function loadAndLearnCorrections() {
  const filePath = path.join(__dirname, "../../data/human_corrections.json");
  const corrections: HumanCorrection[] = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  corrections.forEach(learnFromHuman);
}
