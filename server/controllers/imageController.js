import axios from 'axios'
import FormData from 'form-data'
import { performance } from 'perf_hooks'
import Groq from "groq-sdk"

import userModel from '../models/userModel.js'
import generationModel from '../models/generationModel.js'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// Generate image
export const generateImage = async (req, res) => {
  try {
        console.log("🔥 Backend generateImage hit", new Date().toISOString())
    const {
  userId,
  prompt,
  enhancedPrompt,
  originalScore,
  enhancedScore,
  confidence,
  category,
  strengths,
  critic,
  breakdown,
  mode
} = req.body

    if (!userId || !prompt) {
      return res.json({
        success: false,
        message: 'Missing Details'
      })
    }

    const user = await userModel.findById(userId)

    if (!user || user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No Credit Balance or User not found'
      })
    }

    const startTime = performance.now()

    const formdata = new FormData()
    formdata.append('prompt', prompt)

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formdata,
      {
        headers: {
          ...formdata.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API
        },
        responseType: 'arraybuffer'
      }
    )

    const base64Image = Buffer.from(response.data).toString('base64')

    const resultImage = `data:image/png;base64,${base64Image}`

    const latencyMs = Math.round(
      performance.now() - startTime
    )

    const updatedCredits = user.creditBalance - 1

    await userModel.findByIdAndUpdate(
      user._id,
      {
        creditBalance: updatedCredits
      }
    )

    await generationModel.create({
        userId: user._id,

        prompt,

        enhancedPrompt,

        imageUrl: resultImage,

        originalScore,

        enhancedScore,

        confidence,

        category,

        strengths,

        critic,

        breakdown,

        latencyMs,

       mode: enhancedPrompt
         ? 'enhanced'
          : 'original'
    })

    res.json({
      success: true,
      message: 'Image Generated',
      resultImage,
      latencyMs,
      creditBalance: updatedCredits
    })

  } catch (error) {

    console.error('Image Generation Error:', error)

    res.status(500).json({
      success: false,
      message: 'Image generation failed'
    })
  }
}

// Get generation history
export const getHistory = async (req, res) => {

  try {

    const userId = req.body.userId

const history = await generationModel
  .find({ userId })
  .limit(50)
  .lean()

    res.json({
      success: true,
      history
    })

  } catch (error) {

    console.error(
      'History Error:',
      error
    )

    res.json({
      success: false,
      message: error.message
    })

  }

}
export const getGenerationById = async (req, res) => {
  try {

    const generation = await generationModel.findById(
      req.params.id
    )

    if (!generation) {
      return res.json({
        success: false,
        message: "Generation not found"
      })
    }

    res.json({
      success: true,
      generation
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}
// AI Prompt Optimization Pipeline
export const enhancePrompt = async (req, res) => {
  try {

    const { prompt } = req.body

    if (!prompt || !prompt.trim()) {
      return res.json({
        success: false,
        message: 'Prompt required'
      })
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',

      messages: [
        {
          role: 'system',
          content: `
You are Visiora's Prompt Intelligence Engine.

Analyze the image generation prompt.

Perform the following tasks:

1. Critique the prompt.
2. Detect prompt category.
3. Identify strengths.
4. Identify weaknesses.
5. Improve the prompt.
6. Assign an ORIGINAL prompt quality score.
7. Assign an ENHANCED prompt quality score.
8. Assign confidence score.

Prompt Categories:

- Product Photography
- Portrait Photography
- Food Photography
- Nature Photography
- Architecture
- Environment Art
- Concept Art
- Character Design
- Anime
- Fantasy
- Sci-Fi
- General

Scoring Guidelines:

0-20 = Very Weak
21-40 = Basic
41-60 = Average
61-75 = Good
76-89 = Strong
90-100 = Professional Grade

Important:

Most prompts should score between 45 and 80.

Scores above 90 should be extremely rare.

Only award 90+ if the prompt contains:

- strong subject definition
- detailed visual description
- lighting instructions
- composition instructions
- artistic style
- environmental context
- technical photography/rendering details

Be conservative.

Do not inflate scores.

Score Calculation Rules:

The breakdown should justify the final score.

Consider:

- subjectClarity
- visualDetail
- lighting
- composition
- styleDefinition
- sceneContext
- technicalQuality

Do not generate a score that contradicts the breakdown.

IMPORTANT:

- originalScore must be an INTEGER.
- enhancedScore must be an INTEGER.
- confidence must be an INTEGER.

Examples:

47
58
73
84
91

Never return decimal values.

Enhanced score should usually be higher than original score.

Confidence must be between 50 and 100.

Return ONLY JSON.

Format:

{
  "category": "Product Photography",

  "critic": [
    "Lighting not specified",
    "Camera angle missing"
  ],

  "strengths": [
    "Clear subject"
  ],

  "enhancedPrompt": "Enhanced prompt",

  "originalScore": 58,

  "enhancedScore": 83,

  "confidence": 94,

  "breakdown": {
    "subjectClarity": 12,
    "visualDetail": 9,
    "lighting": 7,
    "composition": 10,
    "styleDefinition": 11,
    "sceneContext": 14,
    "technicalQuality": 20
  }
}
`
        },
        {
          role: 'user',
          content: prompt
        }
      ],

      temperature: 0.7,

      response_format: {
        type: 'json_object'
      }
    })

    const content =
      completion.choices[0]?.message?.content

    const parsed = JSON.parse(content)

console.log(
  'PARSED GROQ RESPONSE:',
  JSON.stringify(parsed, null, 2)
)

    return res.json({
  success: true,

  category:
    parsed.category ?? 'General',

  critic:
    parsed.critic ?? [],

  strengths:
    parsed.strengths ?? [],

  enhancedPrompt:
    parsed.enhancedPrompt ?? prompt,

  originalScore:
    parsed.originalScore ?? 50,

  enhancedScore:
    parsed.enhancedScore ?? 75,

  confidence:
    parsed.confidence ?? 80,

  breakdown:
    parsed.breakdown ?? {}
})

  } catch (error) {

    console.error(
      'Prompt Optimization Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Prompt optimization failed'
    })
  }
}

export const analyzeStory = async (
  req,
  res
) => {

  try {

    const { story } = req.body

    if (!story) {

      return res.json({
        success: false,
        message: 'Story required'
      })

    }

    const analysisCompletion =
      await groq.chat.completions.create({

        model: 'llama-3.3-70b-versatile',

        messages: [

         {
  role: 'system',
  content: `
You are Visiora's Story Intelligence Engine.

Analyze the story.

Return ONLY valid JSON.

{
  "genre":"",
  "storyScore":0,
  "enhancedStoryScore":0,
  "confidence":0,
  "enhancedStory":"",
  "narrativeComplexity":0,
  "emotionalImpact":0,
  "visualConsistency":0,
  "strengths":[],
  "weaknesses":[]
}

Scoring:

narrativeComplexity = 0-100
emotionalImpact = 0-100
visualConsistency = 0-100

storyScore = 0-100
enhancedStoryScore = 0-100

confidence = 50-100

Genres:

Sci-Fi
Fantasy
Adventure
Horror
Drama
Action
Mystery
Romance
Animation
General

Story Score Guidelines

0-20 = Weak
21-40 = Basic
41-60 = Average
61-75 = Good
76-89 = Strong
90-100 = Exceptional

Most stories should score between 60 and 90.

Enhanced score should usually be higher than storyScore.

Evaluate:

- originality
- character development
- pacing
- emotional engagement
- visual storytelling potential
- conflict and stakes
- world building

Create an improved version of the story.

enhancedStory must:

- improve pacing
- improve visual storytelling
- improve emotional impact
- improve scene transitions

All scores must be integers.

Return ONLY JSON.
`
},

          {
            role: 'user',
            content: story
          }

        ],

        response_format: {
          type: 'json_object'
        }

      })

    const storyAnalysis =
      JSON.parse(
        analysisCompletion
          .choices[0]
          .message.content
      )

    return res.json({
      success: true,
      storyAnalysis
    })

  } catch (error) {

    console.error(
      'Analyze Story Error:',
      error
    )

    return res.json({
      success: false,
      message: error.message
    })

  }

}

export const generateStoryboard = async (
  req,
  res
) => {

  try {

    const {
  story,
  userId
} = req.body

const user =
  await userModel.findById(userId)

if (!user) {
  return res.json({
    success:false,
    message:'User not found'
  })
}

if (user.creditBalance < 3) {
  return res.json({
    success:false,
    message:'Minimum 3 credits required'
  })
}

    if (!story) {
      return res.json({
        success: false,
        message: 'Story required'
      })
    }

    const analysisCompletion =
  await groq.chat.completions.create({

    model: 'llama-3.3-70b-versatile',

    messages: [

      {
        role: 'system',
        content: `
You are Visiora's Story Intelligence Engine.

Analyze the story.

Return ONLY valid JSON.

{
  "genre":"",

  "storyScore":0,

  "enhancedStoryScore":0,

  "confidence":0,

  "enhancedStory":"",

  "narrativeComplexity":0,

  "emotionalImpact":0,

  "visualConsistency":0,

  "strengths":[],

  "weaknesses":[]

}

Scoring:

narrativeComplexity = 0-100
emotionalImpact = 0-100
visualConsistency = 0-100

storyScore = 0-100

enhancedStoryScore = 0-100

confidence = 50-100

Genres:

Sci-Fi
Fantasy
Adventure
Horror
Drama
Action
Mystery
Romance
Animation
General

Story Score Guidelines

0-20 = Weak

21-40 = Basic

41-60 = Average

61-75 = Good

76-89 = Strong

90-100 = Exceptional
Enhanced score should usually
be higher than storyScore.

Create an improved version of the story.

enhancedStory must:

- improve pacing
- improve visual storytelling
- improve emotional impact
- improve scene transitions

Return the improved story inside enhancedStory.

All scores must be integers.
`
      },

      {
        role: 'user',
        content: story
      }

    ],

    temperature: 0.7,

    response_format: {
      type: 'json_object'
    }

})

    const completion =
      await groq.chat.completions.create({

        model: 'llama-3.3-70b-versatile',

        messages: [

          {
            role: 'system',
            content: `
You are a professional storyboard artist.

Convert the story into 6 storyboard scenes.

Return ONLY valid JSON.

Format:

{
  "storyboard":[
    {
      "title":"",
      "visual":"",
      "camera":"",
      "mood":"",
      "lighting":"",
      "imagePrompt":""
    }
  ]
}
`
          },

          {
            role: 'user',
            content: story
          }

        ],

        temperature: 0.8,

        response_format: {
  type: 'json_object'
}

      })

      const storyAnalysis =
  JSON.parse(
    analysisCompletion
      .choices[0]
      .message.content
  )

  storyAnalysis.storyScore =
  Number(storyAnalysis.storyScore) || 70

storyAnalysis.enhancedStoryScore =
  Number(storyAnalysis.enhancedStoryScore) || 85

storyAnalysis.confidence =
  Number(storyAnalysis.confidence) || 90

storyAnalysis.narrativeComplexity =
  Number(storyAnalysis.narrativeComplexity) || 75

storyAnalysis.emotionalImpact =
  Number(storyAnalysis.emotionalImpact) || 80

storyAnalysis.visualConsistency =
  Number(storyAnalysis.visualConsistency) || 85

  storyAnalysis.enhancedStory =
  storyAnalysis.enhancedStory || story

console.log(
  "STORY ANALYSIS:",
  storyAnalysis
)

    const content =
      completion.choices[0]
      .message.content

     const parsed =
  JSON.parse(content)

const scenes =
  parsed.storyboard || parsed

for (const scene of scenes) {

  const formdata = new FormData()

  formdata.append(
    'prompt',
    scene.imagePrompt
  )

  const imageResponse =
    await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formdata,
      {
        headers: {
          ...formdata.getHeaders(),
          'x-api-key':
            process.env.CLIPDROP_API
        },
        responseType: 'arraybuffer'
      }
    )

  const base64Image =
    Buffer.from(
      imageResponse.data
    ).toString('base64')

  scene.imageUrl =
    `data:image/png;base64,${base64Image}`

}
console.log(
  "BEFORE:",
  user.creditBalance
)

await userModel.findByIdAndUpdate(
  userId,
  {
    creditBalance:
      user.creditBalance - 3
  }
)

const updatedUser =
  await userModel.findById(userId)

console.log(
  "AFTER:",
  updatedUser.creditBalance
)

await generationModel.create({

  userId,

  prompt: story,

  storyboard: true,

  storyboardScenes: scenes,

  storyAnalysis,

  category: 'Storyboard',

  mode: 'storyboard'

})

res.json({
  success: true,

  storyboard: scenes,

  storyAnalysis,

  creditBalance:
    updatedUser.creditBalance
})

  } catch (error) {

    console.error(
      'Storyboard Error:',
      error
    )

    res.json({
      success: false,
      message: error.message
    })

  }

}