import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Result = () => {

  const [input, setInput] = useState('')
  const [enhancedInput, setEnhancedInput] = useState('')
  const [useEnhanced, setUseEnhanced] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [image, setImage] = useState(assets.sample_img_1)

  const [promptScore, setPromptScore] = useState(null)
  const [promptIssues, setPromptIssues] = useState([])

  // 🆕 Metrics
  const [metrics, setMetrics] = useState(null)

  const { generateImage, enhancePrompt } = useContext(AppContext)

  const analyzePrompt = (prompt) => {
    let score = 0
    const issues = []

    if (prompt.length > 10) score += 30
    else issues.push('Prompt is too short')

    if (prompt.split(' ').length >= 5) score += 30
    else issues.push('Add more descriptive details')

    const styleKeywords = ['realistic', '4k', 'cinematic', 'illustration', 'anime', 'photograph']
    if (styleKeywords.some(k => prompt.toLowerCase().includes(k))) {
      score += 20
    } else {
      issues.push('Specify a visual style')
    }

    if (prompt.match(/light|shadow|depth|background/i)) {
      score += 20
    } else {
      issues.push('Lighting or background not specified')
    }

    return { score, issues }
  }

 const handleEnhancePrompt = async () => {
  const enhanced = await enhancePrompt(input)

  setEnhancedInput(enhanced)
  setUseEnhanced(true)

  const analysis = analyzePrompt(enhanced)
  setPromptScore(analysis.score)
  setPromptIssues(analysis.issues)
}


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    const finalPrompt = useEnhanced ? enhancedInput : input
    const startTime = performance.now()

    if (finalPrompt) {
      const analysis = analyzePrompt(finalPrompt)
      setPromptScore(analysis.score)
      setPromptIssues(analysis.issues)

      const generatedImage = await generateImage(finalPrompt)

      const endTime = performance.now()

      if (generatedImage) {
        setImage(generatedImage)
        setIsImageLoaded(true)

        // 🧠 Metrics captured
        setMetrics({
          generationTime: ((endTime - startTime) / 1000).toFixed(2),
          resolution: '1024 × 1024',
          model: 'Stable Diffusion XL',
          promptType: useEnhanced ? 'Enhanced' : 'Original',
          enhancementApplied: useEnhanced
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
          <p className="text-sm text-neutral-600">Prompt Reliability Score</p>
          <p className={`text-3xl font-bold ${
            promptScore >= 75 ? 'text-green-600'
            : promptScore >= 50 ? 'text-yellow-500'
            : 'text-red-500'
          }`}>
            {promptScore}/100
          </p>
        </div>
      )}

      {promptScore !== null && promptScore < 50 && (
        <p className="text-xs text-neutral-500 mb-4 max-w-md text-center">
          Low score doesn’t block generation, but may reduce consistency.
        </p>
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
      {enhancedInput && (
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
          <div><strong>Resolution:</strong> {metrics.resolution}</div>
          <div><strong>Model:</strong> {metrics.model}</div>
          <div><strong>Prompt Used:</strong> {metrics.promptType}</div>
        </div>
      )}

      {!isImageLoaded && (
        <div className='flex flex-col items-center w-full max-w-xl mt-10 gap-3'>
          <div className='flex w-full bg-neutral-500 text-white text-sm p-0.5 rounded-full'>
            <input
              onChange={e => {
                setInput(e.target.value)
                setUseEnhanced(false)
                setEnhancedInput('')
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
            <button
              type="button"
              onClick={handleEnhancePrompt}
              className="text-sm underline text-indigo-600"
            >
              Enhance Prompt
            </button>
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
              setInput('')
              setEnhancedInput('')
              setUseEnhanced(false)
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
