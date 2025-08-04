const postModel = require("../models/post.model")
const generateContent = require("../services/ai.service")


async function createPostController(req,res) {
  const file = req.file;
  console.log("File received",file)

  const base64Image = new Buffer.from(file.buffer).toString('base64');
  const caption = await generateContent(base64Image);
  // console.log("Caption generated",caption)

  res.json({
    caption:caption
  })



}
module.exports ={
  createPostController
}