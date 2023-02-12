const fs = require("fs");
const csv = require("csv-parser");

fs.readFile("translations.csv", "utf-8", (err, data) => {
  const lines = data
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split(","));
  const languages = lines.shift();
  languages.shift();

  var translationsKeys = "export const translationKeys = {\n";
  const translations = {};
  for (const language of languages) {
    translations[language] = {};
  }
  for (const line of lines) {
    translationsKeys += `${line[0]}: "${line[0]}",\n`;
    for (let index = 0; index < languages.length; index++) {
      const key = line[0];
      translations[languages[index]][key] = line[index + 1];
    }
  }
  fs.writeFile(
    `../src/app/core/models/translations.ts`,
    translationsKeys + "};",
    (err) => {
      if (err) throw err;
      console.log(`gen/translations.json has been saved!`);
    }
  );
  Object.keys(translations).forEach((key) => {
    fs.writeFile(
      `../src/assets/i18n/${key}.json`,
      JSON.stringify(translations[key]),
      (err) => {
        if (err) throw err;
        console.log(`gen/${key}.json has been saved!`);
      }
    );
  });
});
