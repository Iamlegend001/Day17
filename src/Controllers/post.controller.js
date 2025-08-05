const postModel = require("../models/post.model");
const generateContent = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received", file);

    const base64Image = Buffer.from(file.buffer).toString("base64");
    const caption = await generateContent(base64Image);

    const result = await uploadFile(file, `${uuidv4()}`);

    const post = await postModel.create({
      caption: caption,
      image: result.url,
      user: req.user._id,
    });

   res.status(201).json({
    message:"Post Created Successfully",
    post
   })
  } catch (error) {
    console.error("Post creation failed:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createPostController,
};
