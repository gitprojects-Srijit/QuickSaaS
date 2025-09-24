import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlog, generateImage, removeBackgroundImage, removeImageObject, reviewResume } from "../controllers/aiController.js";
import { upload } from "../configerations/multer.js";

const AiRouter = express.Router();

AiRouter.post('/generate-article', auth, generateArticle)
AiRouter.post('/generate-blog-title', auth, generateBlog)
AiRouter.post('/generate-image', auth, generateImage)
AiRouter.post('/remove-image-background', upload.single('image'), auth, removeBackgroundImage)
AiRouter.post('/remove-image-object', upload.single('image'), auth, removeImageObject)
AiRouter.post('/resume-review', upload.single('resume'), auth, reviewResume)

export default AiRouter