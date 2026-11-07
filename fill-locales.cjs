const fs = require("fs");
const path = require("path");

const languages = [
  "da","fr","es","de","it","pt","nl",
  "sv","no","fi","pl","ro","el","cs",
  "uk","ru","tr","ar","he","hi","zh",
  "ja","ko"
];

const english = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "src", "locales", "en", "translation.json"),
    "utf8"
  )
);

languages.forEach((lang) => {
  const file = path.join(
    __dirname,
    "src",
    "locales",
    lang,
    "translation.json"
  );

  fs.writeFileSync(
    file,
    JSON.stringify(english, null, 2)
  );
});

console.log("✅ All language files have been initialized.");