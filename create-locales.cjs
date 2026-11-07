const fs = require("fs");
const path = require("path");

const languages = [
  "en","da","fr","es","de","it","pt","nl",
  "sv","no","fi","pl","ro","el","cs","uk",
  "ru","tr","ar","he","hi","zh","ja","ko"
];

const base = path.join(__dirname, "src", "locales");

if (!fs.existsSync(base)) {
  fs.mkdirSync(base);
}

languages.forEach((lang) => {
  const folder = path.join(base, lang);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const file = path.join(folder, "translation.json");

  if (!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      JSON.stringify({}, null, 2)
    );
  }
});

console.log("✅ All language folders created successfully!");