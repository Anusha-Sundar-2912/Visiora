import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const History = () => {

    const navigate = useNavigate()
    
  const {
    backendUrl,
    token
  } = useContext(AppContext)

  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    try {

      const { data } = await axios.get(
        `${backendUrl}/api/image/history`,
        {
          headers: { token }
        }
      )

      if (data.success) {
        setHistory(data.history)
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen px-6 py-10">
    <div className="flex items-center gap-4 mb-10">

  <img
    src="/gifs/Girl Detective.gif"
    alt="History Mascot"
    className="
      hidden
      md:block
      w-32
      h-32
      object-contain
      flex-shrink-0
    "
  />

  <div>
    <h1 className="text-4xl font-bold">
      Generation History
    </h1>

    <p className="text-neutral-500 mt-2">
      Explore your creative journey and revisit past creations.
    </p>
  </div>

</div>

      <div className="grid md:grid-cols-3 gap-6">

        {history.map((item) => (

      <div
  key={item._id}
  onClick={() => navigate(`/history/${item._id}`)}
  className="
  cursor-pointer
  bg-white
  rounded-2xl
  shadow-md
  hover:shadow-xl
  transition-all
  p-4
  "
>

  <img
    src={
      item.storyboard
        ? item.storyboardScenes?.[0]?.imageUrl
        : item.imageUrl
    }
    alt=""
    className="
    rounded-xl
    mb-4
    h-52
    w-full
    object-cover
    "
  />

  <div className="flex justify-between items-center mb-2">

    <span
      className={`
      px-3 py-1 rounded-full text-xs font-medium
      ${
        item.storyboard
          ? 'bg-pink-100 text-pink-600'
          : 'bg-blue-100 text-blue-600'
      }
      `}
    >
      {
        item.storyboard
          ? '🎬 Storyboard'
          : '🖼️ Image'
      }
    </span>

    <span className="text-xs text-neutral-400">
      {new Date(item.createdAt).toLocaleDateString()}
    </span>

  </div>

  <p className="font-medium text-sm line-clamp-3">

    {
      item.storyboard
        ? `Storyboard • ${item.storyboardScenes?.length || 0} Scenes`
        : item.prompt
    }

  </p>

  <p className="text-sm text-neutral-500 mt-2">

    {
      item.storyboard
        ? `Story Score: ${
            item.storyAnalysis?.enhancedStoryScore ||
            item.storyAnalysis?.storyScore ||
            0
          }`
        : `Score: ${
            item.enhancedScore ||
            item.originalScore
          }`
    }

  </p>

  <p className="text-sm text-neutral-500">

    {
      item.storyboard
        ? `Genre: ${
            item.storyAnalysis?.genre ||
            'Storytelling'
          }`
        : `Category: ${item.category}`
    }

  </p>

</div>

        ))}

      </div>

    </div>
  )
}

export default History