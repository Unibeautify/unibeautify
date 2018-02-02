// tslint:disable:newspaper-order no-shadowed-variable
import { Languages } from "../src/languages";
import { Options } from "../src/options";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { replaceInterface, replaceType } from "./utils";

const [, , dest] = process.argv;

if (!dest) {
    console.error("Missing required arguments: destination.");
    process.exit(1);
}

const destPath = resolve(process.cwd(), dest);
const originalContents = readFileSync(destPath).toString();

let newContents: string = originalContents;
newContents = updateBeautifierLanguageOptions(newContents);
newContents = updateBeautifierOptionName(newContents);
newContents = updateOptionValues(newContents);
newContents = updateBeautifierLanguageOptionComplex(newContents);

writeFileSync(destPath, newContents);
console.log(`Done writing to ${destPath}!`);

function updateBeautifierLanguageOptions(originalContents: string): string {
    const fields: string[] = Languages.map(language => (`    "${language.name}"?: BeautifierLanguageOptions;`));
    const interfaceName = "BeautifierOptions";
    const newInterfaceBody: string = `    "_"?: BeautifierLanguageOptions;\n${fields.join("\n")}`;
    return replaceInterface(originalContents, interfaceName, newInterfaceBody);
}

function updateBeautifierOptionName(originalContents: string): string {
    const optionNames = Object.keys(Options);
    const enums = optionNames.map(name => `"${name}"`);
    const newTypeBody = enums.join(" | ");
    return replaceType(originalContents, "BeautifierOptionName", newTypeBody);
}

function updateOptionValues(originalContents: string): string {
    const optionNames = Object.keys(Options);
    const fields: string[] = optionNames.map(optionName => {
        const option = Options[optionName];
        const fieldType: string = typescriptTypeForOptionType(option.type);
        return `    "${optionName}"?: ${fieldType};`;
    });
    const interfaceName = "OptionValues";
    const newInterfaceBody: string = fields.join("\n");
    return replaceInterface(originalContents, interfaceName, newInterfaceBody);
}

function updateBeautifierLanguageOptionComplex(originalContents: string): string {
    const interfaceName = "BeautifierLanguageOptionComplex";
    const optionNames = Object.keys(Options);
    const fields: string[] = optionNames.map(optionName => {
        const option = Options[optionName];
        const valueType: string = typescriptTypeForOptionType(option.type);
        const fieldType: string = `true | ((${optionName}: ${valueType}) => any) | BeautifierLanguageOption`;
        return `    "${optionName}"?: ${fieldType};`;
    });
    const newInterfaceBody: string = fields.join("\n");
    const newInterfaceContents: string = `export interface ${interfaceName} {
${newInterfaceBody}
}`;
    return originalContents + "\n" + newInterfaceContents + "\n";
}

function typescriptTypeForOptionType(optionType: string): string {
    switch (optionType) {
        case "array":
            return "any[]";
        case "integer":
            return "number";
        default:
            return optionType;
    }
}
