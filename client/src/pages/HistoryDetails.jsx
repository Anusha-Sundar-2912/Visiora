import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'

import React, {
  useEffect,
  useState,
  useContext
} from 'react'

import axios from 'axios'

import {
  useParams
} from 'react-router-dom'

import {
  AppContext
} from '../context/AppContext'

const HistoryDetails = () => {

  const { id } = useParams()

  const {
    backendUrl,
    token
  } = useContext(AppContext)

  const [generation, setGeneration] =
    useState(null)
     const page1Ref = useRef()
     const sceneRefs = useRef([])

     const pdfPage1Ref = useRef()
const pdfPage2Ref = useRef()

const downloadStoryboard = async () => {

    const pdf = new jsPDF(
  'p',
  'mm',
  'a4'
)

const capturePage = async (
  element
) => {

  const canvas =
    await html2canvas(
      element,
      {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      }
    )

  const img =
    canvas.toDataURL('image/png')

  const width = 190

  const height =
    (canvas.height * width) /
    canvas.width

  return {
    img,
    height
  }

}

const page1 =
  await capturePage(
    pdfPage1Ref.current
  )

pdf.addImage(
  page1.img,
  'PNG',
  10,
  10,
  190,
  page1.height
)

pdf.addPage()

const page2 =
  await capturePage(
    pdfPage2Ref.current
  )

pdf.addImage(
  page2.img,
  'PNG',
  10,
  10,
  190,
  page2.height
)

pdf.save(
  'Visiora-Storyboard.pdf'
)
}

  const fetchGeneration = async () => {

    try {

      const { data } = await axios.get(
        `${backendUrl}/api/image/history/${id}`,
        {
          headers: { token }
        }
      )

      if (data.success) {
        setGeneration(data.generation)
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchGeneration()
  }, [])

  if (
  generation &&
  generation.storyboard
) {

  return (

<div className="max-w-7xl mx-auto py-10">

      <div className="flex items-center gap-4 mb-8">

  <h1 className="text-4xl font-bold">
    🎬 Storyboard Details
  </h1>

  <button
    onClick={downloadStoryboard}
    className="
    bg-purple-600
    text-white
    px-4
    py-2
    rounded-xl
    hover:bg-purple-700
    "
  >
    Download PDF
  </button>

</div>

      <p className="text-neutral-600 mb-8">
        {generation.prompt}
      </p>

<div ref={pdfPage1Ref}>

{generation.storyAnalysis && (

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    🧠 Story Intelligence
  </h2>

  <div className="grid md:grid-cols-4 gap-4 mb-6">

    <div className="bg-purple-50 p-4 rounded-xl">
      <p className="text-sm text-gray-500">
        Story Score
      </p>
      <p className="text-3xl font-bold">
        {generation.storyAnalysis.storyScore}
      </p>
    </div>

    <div className="bg-green-50 p-4 rounded-xl">
      <p className="text-sm text-gray-500">
        Enhanced Score
      </p>
      <p className="text-3xl font-bold text-green-600">
        {generation.storyAnalysis.enhancedStoryScore}
      </p>
    </div>

    <div className="bg-blue-50 p-4 rounded-xl">
      <p className="text-sm text-gray-500">
        Confidence
      </p>
      <p className="text-3xl font-bold">
        {generation.storyAnalysis.confidence}%
      </p>
    </div>

    <div className="bg-orange-50 p-4 rounded-xl">
      <p className="text-sm text-gray-500">
        Improvement
      </p>
      <p className="text-3xl font-bold text-green-600">
        +
        {
          (generation.storyAnalysis.enhancedStoryScore || 0)
          -
          (generation.storyAnalysis.storyScore || 0)
        }
      </p>
    </div>

  </div>

  <div className="grid md:grid-cols-4 gap-4 mb-6">

    <div className="border rounded-xl p-4">
      <p className="text-gray-500">
        Genre
      </p>
      <p className="font-bold">
        {generation.storyAnalysis.genre}
      </p>
    </div>

    <div className="border rounded-xl p-4">
      <p className="text-gray-500">
        Narrative Complexity
      </p>
      <p className="font-bold">
        {generation.storyAnalysis.narrativeComplexity}/100
      </p>
    </div>

    <div className="border rounded-xl p-4">
      <p className="text-gray-500">
        Emotional Impact
      </p>
      <p className="font-bold">
        {generation.storyAnalysis.emotionalImpact}/100
      </p>
    </div>

    <div className="border rounded-xl p-4">
      <p className="text-gray-500">
        Visual Consistency
      </p>
      <p className="font-bold">
        {generation.storyAnalysis.visualConsistency}/100
      </p>
    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-green-50 p-5 rounded-xl">

      <h3 className="font-bold text-green-700 mb-3">
        ✅ Story Strengths
      </h3>

      <ul className="list-disc list-inside">

        {generation.storyAnalysis.strengths?.map(
          (item,index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}

      </ul>

    </div>

    <div className="bg-red-50 p-5 rounded-xl">

      <h3 className="font-bold text-red-700 mb-3">
        ⚠ Areas To Improve
      </h3>

      <ul className="list-disc list-inside">

        {generation.storyAnalysis.weaknesses?.map(
          (item,index) => (
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



       {generation.storyboardScenes
  ?.slice(0, 3)
  .map(
          (scene, index) => (

           <div
  key={index}
  ref={(el) => {
    sceneRefs.current[index] = el
  }}
className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              border
              grid
              md:grid-cols-2
              gap-6
              mb-8
              "
            >

              <img
                src={scene.imageUrl}
                alt=""
                className="
                rounded-xl
                h-80
                w-full
                object-cover
                "
              />

              <div>

                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                  Scene {index + 1}
                </h2>

                <p className="mb-3">
                  <strong>Title:</strong>{" "}
                  {scene.title}
                </p>

                <p className="mb-3">
                  <strong>Visual:</strong>{" "}
                  {scene.visual}
                </p>

                <p className="mb-3">
                  <strong>Camera:</strong>{" "}
                  {scene.camera}
                </p>

                <p className="mb-3">
                  <strong>Mood:</strong>{" "}
                  {scene.mood}
                </p>

                <p className="mb-3">
                  <strong>Lighting:</strong>{" "}
                  {scene.lighting}
                </p>

                <div className="bg-neutral-50 p-4 rounded-xl mt-4">

                  <p className="font-semibold mb-2">
                    AI Image Prompt
                  </p>

                  <p className="text-sm text-neutral-600">
                    {scene.imagePrompt}
                  </p>

                </div>

              </div>

            </div>

          )
        )}

        </div>

<div ref={pdfPage2Ref}>

{generation.storyboardScenes
  ?.slice(3)
  .map(
    (scene, index) => (

      <div
        key={index}
        className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        border
        grid
        md:grid-cols-2
        gap-6
        mb-8
        "
      >

        <img
          src={scene.imageUrl}
          alt=""
          className="
          rounded-xl
          h-80
          w-full
          object-cover
          "
        />

        <div>

          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Scene {index + 4}
          </h2>

          <p className="mb-3">
            <strong>Title:</strong>{" "}
            {scene.title}
          </p>

          <p className="mb-3">
            <strong>Visual:</strong>{" "}
            {scene.visual}
          </p>

          <p className="mb-3">
            <strong>Camera:</strong>{" "}
            {scene.camera}
          </p>

          <p className="mb-3">
            <strong>Mood:</strong>{" "}
            {scene.mood}
          </p>

          <p className="mb-3">
            <strong>Lighting:</strong>{" "}
            {scene.lighting}
          </p>

          <div className="bg-neutral-50 p-4 rounded-xl mt-4">

            <p className="font-semibold mb-2">
              AI Image Prompt
            </p>

            <p className="text-sm text-neutral-600">
              {scene.imagePrompt}
            </p>

          </div>

        </div>

      </div>

    )
)}

</div>

      </div>

  )

}

  if (!generation) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Generation Details
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={generation.imageUrl}
          alt=""
          className="rounded-xl shadow"
        />

        <div>

          <div className="mb-6">
            <h2 className="font-bold text-lg">
              Prompt
            </h2>

            <p className="text-neutral-600">
              {generation.prompt}
            </p>
          </div>

          {generation.enhancedPrompt && (
            <div className="mb-6">
              <h2 className="font-bold text-lg">
                Enhanced Prompt
              </h2>

              <p className="text-neutral-600">
                {generation.enhancedPrompt}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">

            <div>
              <strong>
                Original Score
              </strong>
              <p>
                {generation.originalScore}
              </p>
            </div>

            <div>
              <strong>
                Enhanced Score
              </strong>
              <p>
                {generation.enhancedScore}
              </p>
            </div>

            <div>
              <strong>
                Confidence
              </strong>
              <p>
                {generation.confidence}
              </p>
            </div>

            <div>
              <strong>
                Category
              </strong>
              <p>
                {generation.category}
              </p>
            </div>

          </div>

          <div className="mb-6">

            <h2 className="font-bold text-lg mb-2">
              Strengths
            </h2>

            <ul className="list-disc list-inside">

              {generation.strengths?.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}

            </ul>

          </div>
                {generation.breakdown && (

  <div className="mt-8">

    <h2 className="font-bold text-lg mb-4">
      Prompt Quality Breakdown
    </h2>

    <div className="bg-white rounded-xl p-5 border">

      <div className="flex justify-between border-b py-2">
        <span>Subject Clarity</span>
        <span>{generation.breakdown.subjectClarity}/20</span>
      </div>

      <div className="flex justify-between border-b py-2">
        <span>Visual Detail</span>
        <span>{generation.breakdown.visualDetail}/20</span>
      </div>

      <div className="flex justify-between border-b py-2">
        <span>Lighting</span>
        <span>{generation.breakdown.lighting}/20</span>
      </div>

      <div className="flex justify-between border-b py-2">
        <span>Composition</span>
        <span>{generation.breakdown.composition}/20</span>
      </div>

      <div className="flex justify-between border-b py-2">
        <span>Style Definition</span>
        <span>{generation.breakdown.styleDefinition}/20</span>
      </div>

      <div className="flex justify-between border-b py-2">
        <span>Scene Context</span>
        <span>{generation.breakdown.sceneContext}/20</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Technical Quality</span>
        <span>{generation.breakdown.technicalQuality}/20</span>
      </div>

    </div>

  </div>

)}
          <div className="mb-6">

            <h2 className="font-bold text-lg mb-2">
              Issues
            </h2>

            <ul className="list-disc list-inside">

              {generation.critic?.map(
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

    </div>
  )
}

export default HistoryDetails