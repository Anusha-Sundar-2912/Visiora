import express from 'express'

import {
  generateImage,
  enhancePrompt,
  getHistory,
  getGenerationById,
  generateStoryboard,
  analyzeStory
} from '../controllers/imageController.js'

import authUser from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post(
  '/enhance-prompt',
  authUser,
  enhancePrompt
)

imageRouter.post(
  '/generate-image',
  authUser,
  generateImage
)

imageRouter.get(
  '/history',
  authUser,
  getHistory
)

imageRouter.get(
  '/history/:id',
  authUser,
  getGenerationById
)
imageRouter.post(
  '/analyze-story',
  authUser,
  analyzeStory
)

imageRouter.post(
  '/storyboard',
  authUser,
  generateStoryboard
)

export default imageRouter