import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Result = () => {

  const [input, setInput] = useState('')
  const [enhancedInput, setEnhancedInput] = useState('')
  const [useEnhanced, setUseEnhanced] = useState(false)

  const [isAnalyzed, setIsAnalyzed] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [image, setImage] = useState(assets.sample_img_1)

const [promptScore, setPromptScore] = useState(null)
const [promptIssues, setPromptIssues] = useState([])
const [strengths, setStrengths] = useState([])

const [originalScore, setOriginalScore] = useState(null)
const [enhancedScore, setEnhancedScore] = useState(null)
const [scoreImprovement, setScoreImprovement] = useState(null)
const [confidence, setConfidence] = useState(null)
const [category, setCategory] = useState('')
const [breakdown, setBreakdown] = useState(null)
const [showBreakdown, setShowBreakdown] = useState(false)
  // Metrics
  const [metrics, setMetrics] = useState(null)

  const { generateImage, enhancePrompt } = useContext(AppContext)

       const getPromptRating = (score) => {
       if (score >= 91) return 'Excellent'
       if (score >= 71) return 'Good'
       if (score >= 41) return 'Fair'
       return 'Poor'
}
  
const handleAnalyzePrompt = async () => {

  const result = await enhancePrompt(input)

  if (!result) return

  setEnhancedInput(
    result.enhancedPrompt
  )

 setPromptScore(
  result.originalScore
)

setPromptIssues(
  result.critic || []
)

setStrengths(
  result.strengths || []
)

setConfidence(
  result.confidence
)

setCategory(
  result.category
)

setBreakdown(
  result.breakdown || null
)

setOriginalScore(
  result.originalScore
)

setEnhancedScore(
  result.enhancedScore
)

setScoreImprovement(
  Math.round(
    result.enhancedScore -
    result.originalScore
  )
)
setIsAnalyzed(true)
}


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    const finalPrompt = useEnhanced ? enhancedInput : input
    const startTime = performance.now()

    if (finalPrompt) {
      const generatedImage = await generateImage({

  prompt: finalPrompt,

  enhancedPrompt: enhancedInput,

  originalScore,

  enhancedScore,

  confidence,

  category,

  strengths,

  critic: promptIssues,

  breakdown,

  mode: useEnhanced
    ? 'enhanced'
    : 'original'

})

      const endTime = performance.now()

      if (generatedImage) {
        setImage(generatedImage)
        setIsImageLoaded(true)

        // Metrics capture 
        setMetrics({
  generationTime: ((endTime - startTime) / 1000).toFixed(2),
  promptScore: promptScore || 0,
  wordCount: finalPrompt.split(' ').length,
  promptType: useEnhanced ? 'Enhanced' : 'Original',
  enhancementApplied: useEnhanced,
  creditsUsed: 1
})
      }
    }

    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      {/* Prompt Score */}
      {promptScore !== null && (
        <div className="mb-2 text-center">
          <p className="text-sm text-neutral-600">Prompt Quality Score</p>
<div
  className={`text-3xl font-bold ${
    promptScore >= 75
      ? 'text-green-600'
      : promptScore >= 50
      ? 'text-yellow-500'
      : 'text-red-500'
  }`}
>
  <div>
    {promptScore}/100
  </div>

  <div className="text-sm font-medium text-neutral-600 mt-1">
  {getPromptRating(promptScore)}
</div>

<div className="text-yellow-500 text-lg">
  {
    promptScore >= 91
      ? '★★★★★'
      : promptScore >= 71
      ? '★★★★☆'
      : promptScore >= 41
      ? '★★★☆☆'
      : '★☆☆☆☆'
  }
</div>

{confidence && (
  <div className="mt-2 text-sm text-neutral-500">
    <p>
      Confidence: {confidence}%
    </p>

    <p>
      Category: {category}
    </p>
  </div>
)}
</div>
        </div>
      )}

      {promptScore !== null && promptScore < 50 && (
        <p className="text-xs text-neutral-500 mb-4 max-w-md text-center">
          Low score doesn’t block generation, but may reduce consistency.
        </p>
      )}

      {strengths.length > 0 && (
  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
    <p className="font-semibold text-sm mb-2">
      Strengths
    </p>

    <ul className="text-sm list-disc list-inside text-green-700">
      {strengths.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}

      {/* Explainability */}
      {promptIssues.length > 0 && (
        <div className="mb-6 bg-neutral-100 rounded-lg p-4 max-w-md">
          <p className="font-semibold text-sm mb-2">Why this score?</p>
          <ul className="text-sm list-disc list-inside text-neutral-600">
            {promptIssues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
     
      {/* Enhanced Prompt Preview */}
      {useEnhanced &&
           originalScore !== null &&
           enhancedScore !== null && (
  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-xl">
    <p className="font-semibold">
      Prompt Improvement Analysis
    </p>

    <p>Original Score: {originalScore}/100</p>

    <p>Enhanced Score: {enhancedScore}/100</p>

    <p className="text-green-600 font-bold">
      Improvement: +{scoreImprovement}
    </p>
  </div>
)}
      {useEnhanced && enhancedInput && (
        <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-xl">
          <p className="text-sm font-semibold mb-1">Enhanced Prompt</p>
          <p className="text-sm text-neutral-700">{enhancedInput}</p>
        </div>
      )}

        {/* 🌿 Image with vines */}
      <div className="relative flex justify-center items-center my-6">

        <img
          src="/gifs/plant.gif"
          alt=""
          className="absolute -left-32 top-1/2 -translate-y-1/2
          h-[380px] opacity-40 hidden lg:block pointer-events-none"
        />

        <img
          src="/gifs/plant.gif"
          alt=""
          className="absolute -right-32 top-1/2 -translate-y-1/2
          h-[380px] opacity-40 hidden lg:block pointer-events-none scale-x-[-1]"
        />

        <div>
          <img className='max-w-sm rounded relative z-10' src={image} alt="" />
          <p className={!loading ? 'hidden' : ''}>Loading.....</p>
        </div>
      </div>
      

      {/* Metrics Panel */}
      {metrics && (
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm bg-neutral-100 p-4 rounded-lg max-w-md">
          <div><strong>Generation Time:</strong> {metrics.generationTime}s</div>

<div><strong>Prompt Score:</strong> {metrics.promptScore}/100</div>

<div><strong>Word Count:</strong> {metrics.wordCount}</div>

<div><strong>Credits Used:</strong> {metrics.creditsUsed}</div>

<div><strong>Prompt Type:</strong> {metrics.promptType}</div>

<div>
  <strong>Enhanced:</strong>
  {metrics.enhancementApplied ? ' Yes' : ' No'}
</div>
        </div>
      )}

      {!isImageLoaded && (
        <div className='flex flex-col items-center w-full max-w-xl mt-10 gap-3'>
          <div className='flex w-full bg-neutral-500 text-white text-sm p-0.5 rounded-full'>
            <input
              onChange={e => {
                setInput(e.target.value)

                     setUseEnhanced(false)
                     setIsAnalyzed(false)
                     setEnhancedInput('')

                     setOriginalScore(null)
                     setEnhancedScore(null)
                     setScoreImprovement(null)

                     setPromptScore(null)
                     setPromptIssues([])
                     setStrengths([])
                     setConfidence(null)
                     setCategory('')
                     setBreakdown(null)
                     setShowBreakdown(false)
                     
}}
              value={input}
              className='flex-1 bg-transparent outline-none ml-8'
              type="text"
              placeholder='Describe what you want to generate'
            />
            <button className='bg-zinc-900 px-10 py-3 rounded-full'>
              Generate
            </button>
          </div>

          {input && (
  <div className="flex gap-4">

      <button
       type="button"
        onClick={handleAnalyzePrompt}
        className="text-sm underline text-indigo-600"
      >
          Analyze Prompt
      </button>
          {isAnalyzed && (
             <button
                 type="button"
                onClick={() => {
                  setUseEnhanced(true)
                  setPromptScore(enhancedScore)

                   window.scrollTo({
                    top: 0,
                     behavior: 'smooth'
                  })
          }}
                 className="text-sm underline text-green-600"
              >
                  Apply Enhancement
              </button>
)}      
  </div>
)}

</div>
)}
  
  {isImageLoaded && breakdown && (
  <div className="mt-8 max-w-xl w-full">

    <button
      onClick={() =>
        setShowBreakdown(!showBreakdown)
      }
      className="w-full text-left bg-blue-50 border border-blue-200 rounded-lg p-4 font-semibold"
    >
      {showBreakdown
        ? '▼ Hide Detailed Score Breakdown'
        : '📊 View Detailed Score Breakdown'}
    </button>

    {showBreakdown && (
      <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4">

        <div className="flex justify-between border-b py-2">
          <span>Subject Clarity</span>
          <span>{breakdown.subjectClarity}/20</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span>Visual Detail</span>
          <span>{breakdown.visualDetail}/20</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span>Lighting</span>
          <span>{breakdown.lighting}/20</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span>Composition</span>
          <span>{breakdown.composition}/20</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span>Style Definition</span>
          <span>{breakdown.styleDefinition}/20</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span>Scene Context</span>
          <span>{breakdown.sceneContext}/20</span>
        </div>

        <div className="flex justify-between py-2">
          <span>Technical Quality</span>
          <span>{breakdown.technicalQuality}/20</span>
        </div>

      </div>
    )}

  </div>
)}


{isImageLoaded && (
        <div className='flex gap-2 mt-10'>
          <button
            type="button"
           onClick={() => {
             setIsImageLoaded(false)

             setMetrics(null)

             setPromptScore(null)
             setPromptIssues([])
             setStrengths([])

             setOriginalScore(null)
             setEnhancedScore(null)
             setScoreImprovement(null)

             setConfidence(null)
             setCategory('')
             setBreakdown(null)
             setShowBreakdown(false)
             setInput('')
             setEnhancedInput('')
             setUseEnhanced(false)
             setIsAnalyzed(false)
      }}
            className='border border-zinc-900 px-6 py-2 rounded-full'
          >
            Generate Another
          </button>
          <a href={image} download className='bg-zinc-900 text-white px-6 py-2 rounded-full'>
            Download
          </a>
        </div>
      )}

    </motion.form>
  )
}

export default Result
