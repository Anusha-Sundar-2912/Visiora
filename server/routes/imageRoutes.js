import express from 'express'
import { generateImage, enhancePrompt } from '../controllers/imageController.js'
import authUser from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/enhance-prompt', authUser, enhancePrompt)
imageRouter.post('/generate-image', authUser, generateImage)

export default imageRouter
