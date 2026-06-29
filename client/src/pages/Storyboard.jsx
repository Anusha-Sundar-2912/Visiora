import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'

import React, {
  useState,
  useContext
} from 'react'

import axios from 'axios'

import {
  AppContext
} from '../context/AppContext'

const Storyboard = () => {

  const [story, setStory] = useState('')
  const [enhancedStory, setEnhancedStory] =
  useState('')

const [storyAnalyzed, setStoryAnalyzed] =
  useState(false)

const [useEnhanced, setUseEnhanced] =
  useState(false)
const [storyboard, setStoryboard] = useState([])
const [storyAnalysis, setStoryAnalysis] =
  useState(null)
const [loading, setLoading] = useState(false)
const pdfRef = useRef()
const hiddenPdfRef = useRef()

const {
  backendUrl,
  token,
  user,
  loadCreditsData
} = useContext(AppContext)

const analyzeStory = async () => {

  if (!story.trim()) return

  try {

    const { data } = await axios.post(

      `${backendUrl}/api/image/analyze-story`,

      {
        story
      },

      {
        headers: { token }
      }

    )

    if (data.success) {

      setStoryAnalysis(
        data.storyAnalysis
      )

      setEnhancedStory(
        data.storyAnalysis
          ?.enhancedStory || ''
      )

      setStoryAnalyzed(true)

    }

  } catch (error) {

    console.error(error)

  }

}
const generateStoryboard = async () => {

  if (!story.trim()) return

  setLoading(true)

  try {

    const { data } = await axios.post(
  `${backendUrl}/api/image/storyboard`,
  {
    story:
  useEnhanced
    ? enhancedStory
    : story,

userId: user._id
  },
  {
    headers: { token }
  }
)
if (data.success) {

  setStoryboard(
    data.storyboard
  )

  setStoryAnalysis(
    data.storyAnalysis
  )

  loadCreditsData()

}
  } catch (error) {

    console.error(error)

  }

  setLoading(false)

}

const exportPDF = async () => {

  if (!hiddenPdfRef.current) return

  const pdf = new jsPDF("p", "mm", "a4")

  const pages = hiddenPdfRef.current.querySelectorAll(".pdf-page")

  for (let i = 0; i < pages.length; i++) {

    const canvas = await html2canvas(pages[i], {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY
    })

    const imgData = canvas.toDataURL("image/png")

    const pdfWidth = 210
    const pdfHeight = 297

    const margin = 10

    const imgWidth = pdfWidth - margin * 2

    const imgHeight =
      canvas.height *
      imgWidth /
      canvas.width

    if (i !== 0) {
      pdf.addPage()
    }

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin,
      imgWidth,
      Math.min(imgHeight, pdfHeight - margin * 2)
    )

  }

  pdf.save("Visiora-Storyboard.pdf")

}

  pdf.save("Visiora-Storyboard.pdf")

}

  return (
    <div className="max-w-6xl mx-auto py-10">

      <div className="flex items-center gap-4 mb-10">

<img
  src="/gifs/wizard.GIF"
  alt="Storyboard Mascot"
  className="
    hidden
    md:block
    w-28
    h-28
    object-contain
    flex-shrink-0
  "
/>

  <div>

    <h1 className="text-4xl font-bold">
      Storyboard Generator
    </h1>

    <p className="text-neutral-500 mt-2">
      Transform your ideas into cinematic scenes and visual stories.
    </p>

  </div>

</div>

      <textarea
        value={story}
        onChange={(e) => {

  setStory(e.target.value)

  setStoryAnalyzed(false)

  setStoryAnalysis(null)

  setEnhancedStory('')

  setUseEnhanced(false)

}}
        placeholder="Describe your story..."
        className="w-full border rounded-xl p-4 h-40"
      />

      <div className="flex gap-4 mt-6 mb-6">

{!storyAnalyzed && story.trim() && (

  <button
    onClick={analyzeStory}
    className="
    bg-blue-500
    text-white
    px-6
    py-3
    rounded-xl
    "
  >
    Analyze Story
  </button>

)}

{storyAnalyzed && (

  <button
    onClick={generateStoryboard}
    disabled={loading}
    className="
    bg-purple-500
    text-white
    px-6
    py-3
    rounded-xl
    "
  >
{
  loading
    ? 'Generating...'
    : useEnhanced
      ? 'Generate Enhanced Storyboard'
      : 'Generate Storyboard'
}
  </button>

)}

  {storyboard.length > 0 && (

    <button
      onClick={exportPDF}
      className="
      bg-green-600
      text-white
      px-6
      py-3
      rounded-xl
      hover:bg-green-700
      transition-all
      "
    >
      Export Storyboard PDF 📄
    </button>

  )}

</div>

{storyAnalysis && (

<div className="
bg-gradient-to-r
from-indigo-50
to-purple-50
rounded-2xl
p-6
shadow-lg
mb-8
">

<h2 className="text-2xl font-bold mb-6">
  🎬 Story Intelligence
</h2>

<div className="grid md:grid-cols-8 gap-4">

  <div className="bg-white rounded-xl p-4">

  <p className="text-gray-500">
    Story Score
  </p>

<p className="font-bold text-lg">
  {storyAnalysis.storyScore}/100
</p>

<p className="text-sm mt-1">

{
storyAnalysis.storyScore >= 90
? 'Exceptional'

: storyAnalysis.storyScore >= 75
? 'Strong'

: storyAnalysis.storyScore >= 60
? 'Good'

: storyAnalysis.storyScore >= 40
? 'Average'

: 'Weak'
}

</p>

</div>

<div className="bg-white rounded-xl p-4">

  <p className="text-gray-500">
    Enhanced Score
  </p>

  <p className="font-bold text-lg text-green-600">
    {storyAnalysis.enhancedStoryScore}/100
  </p>

  <p className="text-sm text-green-500 mt-1">
    +{
      storyAnalysis.enhancedStoryScore -
      storyAnalysis.storyScore
    }
  </p>

</div>

<div className="bg-white rounded-xl p-4">

  <p className="text-gray-500">
    Improvement
  </p>

  <p className="font-bold text-2xl text-green-600">

    +{
      storyAnalysis.enhancedStoryScore -
      storyAnalysis.storyScore
    }

  </p>

</div>
<div className="bg-white rounded-xl p-4">

  <p className="text-gray-500">
    Confidence
  </p>

  <p className="font-bold text-lg">
    {storyAnalysis.confidence}%
  </p>

</div>

  <div className="bg-white rounded-xl p-4">
    <p className="text-gray-500">
      Genre
    </p>
    <p className="font-bold text-lg">
      {storyAnalysis.genre}
    </p>
  </div>

  <div className="bg-white rounded-xl p-4">
    <p className="text-gray-500">
      Narrative Complexity
    </p>
    <p className="font-bold text-lg">
      {storyAnalysis.narrativeComplexity}/100
    </p>
  </div>

  <div className="bg-white rounded-xl p-4">
    <p className="text-gray-500">
      Emotional Impact
    </p>
    <p className="font-bold text-lg">
      {storyAnalysis.emotionalImpact}/100
    </p>
  </div>

  <div className="bg-white rounded-xl p-4">
    <p className="text-gray-500">
      Visual Consistency
    </p>
    <p className="font-bold text-lg">
      {storyAnalysis.visualConsistency}/100
    </p>
  </div>

</div>

{storyAnalysis.enhancedStory && (

  <div className="bg-white rounded-xl p-5 mt-6">

    <h3 className="font-bold mb-3 text-green-600">
      Enhanced Story
    </h3>

    <p className="text-neutral-700 whitespace-pre-line">
      {storyAnalysis.enhancedStory}
    </p>

    <button
      onClick={() =>
        setUseEnhanced(true)
      }
      className="
      mt-4
      bg-green-500
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-green-600
      "
    >
      {
  useEnhanced
    ? '✓ Enhanced Story Selected'
    : '✨ Use Enhanced Story'
}
    </button>

  </div>

)}

<div className="grid md:grid-cols-2 gap-6 mt-6">

  <div className="bg-white rounded-xl p-4">

      <h3 className="font-bold mb-3 text-green-600">
         Story Strengths
      </h3>

    <ul className="list-disc list-inside">

      {storyAnalysis.strengths?.map(
        (item, index) => (
          <li key={index}>
            {item}
          </li>
        )
      )}

    </ul>

  </div>

  <div className="bg-white rounded-xl p-4">

      <h3 className="font-bold mb-3 text-red-500">
        Areas To Improve
      </h3>

    <ul className="list-disc list-inside">

      {storyAnalysis.weaknesses?.map(
        (item, index) => (
          <li key={index}>
            {item}
          </li>
        )
      )}

    </ul>

  </div>

</div>

</div>

)}

{storyboard.length > 0 && (

  <div
  ref={pdfRef}
  className="mt-10 grid gap-6"
>

    {storyboard.map((scene, index) => (

         <div
            key={index}
            className="
            bg-gradient-to-r
            from-purple-50
            to-pink-50
            rounded-2xl
            shadow-lg
            p-6
            border
            grid
            md:grid-cols-3
            gap-6
            items-center
            "
          >
            <img
  src={scene.imageUrl}
  alt={scene.title}
  className="
    rounded-xl
    h-52
    w-full
    object-cover
    shadow
  "
/>


        <h2 className="text-2xl font-bold mb-3 text-purple-600">
          Scene {index + 1}
        </h2>

        <p className="mb-2">
          <strong>Title:</strong> {scene.title}
        </p>

        <p className="mb-2">
          <strong>Visual:</strong> {scene.visual}
        </p>

       <p className="mb-2">
  <strong>Camera:</strong> {scene.camera}
</p>

<p className="mb-2">
  <strong>Mood:</strong> {scene.mood}
</p>

<p className="mb-2">
  <strong>Lighting:</strong> {scene.lighting}
</p>

<div className="bg-white rounded-xl p-4 mt-4">

  <p className="font-semibold mb-2">
    AI Image Prompt
  </p>

  <p className="text-gray-600 text-sm">
    {scene.imagePrompt}
  </p>

</div>

      </div>

    ))}

  </div>

)}
<div
  ref={hiddenPdfRef}
  className="fixed left-[-99999px] top-0 bg-white w-[794px] p-8"
>

  {/* ---------- PAGE 1 ---------- */}

  <div className="pdf-page">

    <h1 className="text-3xl font-bold mb-6">
      🎬 Story Intelligence
    </h1>

    <div className="grid grid-cols-4 gap-4 mb-8">

      <div className="border rounded-xl p-4">
        <p>Story Score</p>
        <h2 className="font-bold">
          {storyAnalysis?.storyScore}/100
        </h2>
      </div>

      <div className="border rounded-xl p-4">
        <p>Enhanced Score</p>
        <h2 className="font-bold">
          {storyAnalysis?.enhancedStoryScore}/100
        </h2>
      </div>

      <div className="border rounded-xl p-4">
        <p>Confidence</p>
        <h2 className="font-bold">
          {storyAnalysis?.confidence}%
        </h2>
      </div>

      <div className="border rounded-xl p-4">
        <p>Genre</p>
        <h2 className="font-bold">
          {storyAnalysis?.genre}
        </h2>
      </div>

    </div>

    {storyboard.slice(0,3).map((scene,index)=>(

      <div
        key={index}
        className="border rounded-xl p-4 mb-6"
      >

        <div className="flex gap-4">

          <img
            src={scene.imageUrl}
            alt=""
            className="w-44 h-36 rounded-xl object-cover"
          />

          <div>

            <h2 className="font-bold text-xl mb-2">
              Scene {index+1}
            </h2>

            <p><strong>Title:</strong> {scene.title}</p>

            <p><strong>Visual:</strong> {scene.visual}</p>

            <p><strong>Camera:</strong> {scene.camera}</p>

            <p><strong>Mood:</strong> {scene.mood}</p>

            <p><strong>Lighting:</strong> {scene.lighting}</p>

          </div>

        </div>

      </div>

    ))}

  </div>

  {/* ---------- PAGE 2 ---------- */}

  <div
    className="pdf-page"
    style={{
      marginTop: "80px"
    }}
  >

    {storyboard.slice(3,6).map((scene,index)=>(

      <div
        key={index}
        className="border rounded-xl p-4 mb-6"
      >

        <div className="flex gap-4">

          <img
            src={scene.imageUrl}
            alt=""
            className="w-44 h-36 rounded-xl object-cover"
          />

          <div>

            <h2 className="font-bold text-xl mb-2">
              Scene {index+4}
            </h2>

            <p><strong>Title:</strong> {scene.title}</p>

            <p><strong>Visual:</strong> {scene.visual}</p>

            <p><strong>Camera:</strong> {scene.camera}</p>

            <p><strong>Mood:</strong> {scene.mood}</p>

            <p><strong>Lighting:</strong> {scene.lighting}</p>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>
    </div>
  )
}

export default Storyboard