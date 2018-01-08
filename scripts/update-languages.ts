// tslint:disable:newspaper-order no-console
import * as request from "request";
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

import { Language } from "../src/";

const outFileName: string = process.argv[2];
const outFilePath = path.resolve(process.cwd(), outFileName);
// tslint:disable-next-line
const originalLanguages = require(outFilePath);

const languagesUrl =
  "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";

request(languagesUrl, (error, response, body) => {
  if (error) {
    console.log("error:", error); // Print the error if one occurred
    return process.exit(1);
  }

  try {
    const githubLanguages: GitHubLanguages = yaml.safeLoad(body);
    const languages = convertGitHubLanguageToUnibeautify(githubLanguages);

    const finalLanguages = mergeLanguages(originalLanguages, languages);
    console.log(`Writing to ${outFilePath}`);
    fs.writeFileSync(outFilePath, JSON.stringify(finalLanguages, null, 2));

    const nonGitHubLanguages = finalLanguages.filter(
      lang => lang.liguistLanguageId === undefined
    );
    console.log();
    console.log("Total # of Languages: ", finalLanguages.length);
    console.log(
      "# of languages GitHub is missing: ",
      nonGitHubLanguages.length
    );
    console.log(
      nonGitHubLanguages
        .map((lang, index) => `${index + 1}. ${lang.name}`)
        .join("\n")
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

function convertGitHubLanguageToUnibeautify(
  languages: GitHubLanguages
): Partial<Language>[] {
  return _.chain(languages)
    .toPairs()
    .map((value: [string, GitHubLanguage]) => {
      const [languageName, language] = value;
      return <Partial<Language>>{
        aceMode: language.ace_mode,
        extensions: language.extensions,
        fileNames: language.filenames,
        liguistLanguageId: language.language_id,
        name: languageName,
        textMateScope: language.tm_scope
      };
    })
    .value();
}

function mergeLanguages(
  baseLanguages: Language[],
  newLanguages: Partial<Language>[]
): Language[] {
  const baseLanguagesMap: { [languageName: string]: Language } = _.keyBy(
    baseLanguages,
    lang => lang.name
  );
  newLanguages.forEach(lang => {
    const langName: string = lang.name as string;
    const baseLanguage = baseLanguagesMap[langName] || {};
    const newLanguage = mergeLanguage(baseLanguage, lang);
    baseLanguagesMap[langName] = newLanguage;
  });
  return _.chain(baseLanguagesMap)
    .values()
    .sortBy("name")
    .value() as any[];
}

function mergeLanguage(
  baseLanguage: Language | {},
  newLanguage: Partial<Language>
): Language {
  return {
    aceMode: getString("aceMode", baseLanguage, newLanguage),
    aliases: getArray("aliases", baseLanguage, newLanguage),
    atomGrammars: getArray("atomGrammars", baseLanguage, newLanguage),
    extensions: getArray("extensions", baseLanguage, newLanguage),
    fileNames: getArray("fileNames", baseLanguage, newLanguage),
    liguistLanguageId: getNumber(
      "liguistLanguageId",
      baseLanguage,
      newLanguage
    ),
    name: getString("name", baseLanguage, newLanguage),
    namespace: getString("namespace", baseLanguage, newLanguage),
    sublimeSyntaxes: getArray("sublimeSyntaxes", baseLanguage, newLanguage),
    textMateScope: getString("textMateScope", baseLanguage, newLanguage),
    vscodeLanguages: getArray("vscodeLanguages", baseLanguage, newLanguage)
  };
}

function getArray(key: keyof Language, obj1: any, obj2: any): string[] {
  return _.union<string>(obj1[key] || [], obj2[key] || [])
    .sort();
}

function getString(key: keyof Language, obj1: any, obj2: any): string {
  return obj1[key] || obj2[key] || "";
}

function getNumber(key: keyof Language, obj1: any, obj2: any): number {
  if (typeof obj1[key] === "number") {
    return obj1[key];
  }
  if (typeof obj2[key] === "number") {
    return obj2[key];
  }
  return -1;
}

interface GitHubLanguages {
  [languageName: string]: GitHubLanguage;
}

interface GitHubLanguage {
  language_id: number;
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  color: string;
  group: string;
  aliases: string[];
  extensions: string[];
  interpreters: string[];
  tm_scope: string;
  ace_mode: string;
  codemirror_mode: string;
  codemirror_mime_type: string;
  filenames?: string[];
  searchable?: boolean;
  wrap?: boolean;
}
