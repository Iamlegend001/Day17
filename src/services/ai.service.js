require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

async function generateContent(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:
        "Tu ek number ka lafanga caption baaz hai 😏🔥 Har image ke liye ek hi chhota, kadak, aur chulbula caption likh — full naughty vibes mein 😜💄 Thoda patana, thoda jalaana, thoda mast timepass karna 😈😉 Emojis daalna must hai 😘🔥 aur hashtags se setting tight rakhni hai #OyeHottie #AagLagaDiRe",
    },
  });
  return response.text;
}

module.exports = generateContent;
