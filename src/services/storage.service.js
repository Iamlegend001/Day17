const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY, // ✅ Corrected the typo
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  try {
    // ✅ Convert file buffer to base64 string
    const base64Image = file.buffer.toString("base64");

    const response = await imagekit.upload({
      file: base64Image,       // ✅ MUST be base64 string
      fileName: fileName,
      folder:"Cohort-ai-social"
    });

    return response;
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw error;
  }
}

module.exports = uploadFile;
