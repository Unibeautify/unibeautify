import { Languages } from "../src/languages";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const [, , interfaceName, dest] = process.argv;

if (!(interfaceName && dest)) {
    console.error("Missing required arguments: interfaceName and/or dest.");
    process.exit(1);
}

const destPath = resolve(process.cwd(), dest);
const originalContents = readFileSync(destPath).toString();

const fields: string[] = Languages.map(language => (`    "${language.name}"?: BeautifierLanguageOptions;`));
const newOptions: string = `
export interface ${interfaceName} {
    "_"?: BeautifierLanguageOptions;
${fields.join("\n")}
}
`;

const newContents = originalContents.replace(new RegExp(`export interface ${interfaceName} {[\\s\\S]+?}`, "gm"), newOptions);

writeFileSync(destPath, newContents);
console.log(`Done writing to ${destPath}!`);
