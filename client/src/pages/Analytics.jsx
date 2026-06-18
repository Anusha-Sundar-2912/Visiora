import React, {
  useContext,
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import {
  AppContext
} from '../context/AppContext'

import {
  useNavigate
} from 'react-router-dom'

const Analytics = () => {

    const navigate = useNavigate()

  const {
    backendUrl,
    token
  } = useContext(AppContext)

 const [stats, setStats] = useState({
  totalGenerations: 0,
  totalStoryboards: 0,
  totalImages: 0,
  averageScore: 0,
  bestScore: 0,
  favoriteCategory: '-'
})

const [historyData, setHistoryData] = useState([])

  const fetchAnalytics = async () => {

    try {

      const { data } = await axios.get(
        `${backendUrl}/api/image/history`,
        {
          headers: { token }
        }
      )

      if (!data.success) return

      const history = data.history
      setHistoryData(history)

      const totalGenerations =
        history.length

        const totalStoryboards =
  history.filter(
    item => item.storyboard
  ).length

const totalImages =
  history.filter(
    item => !item.storyboard
  ).length

  const scores = history.map(item => {

  if (item.storyboard) {

    return (
      item.storyAnalysis
        ?.enhancedStoryScore ||

      item.storyAnalysis
        ?.storyScore ||

      0
    )

  }

  return (
    item.enhancedScore ||
    item.originalScore ||
    0
  )

})

      const averageScore =
        scores.length
          ? Math.round(
              scores.reduce(
                (a, b) => a + b,
                0
              ) / scores.length
            )
          : 0

      const bestScore =
        scores.length
          ? Math.max(...scores)
          : 0

      const categoryCount = {}

      history.forEach(item => {

        if (!item.category) return

        categoryCount[item.category] =
          (categoryCount[item.category] || 0) + 1
      })

      let favoriteCategory = '-'

      let maxCount = 0

      Object.entries(categoryCount)
        .forEach(([category, count]) => {

          if (count > maxCount) {

            maxCount = count

            favoriteCategory = category

          }

        })

setStats({
  totalGenerations,
  totalStoryboards,
  totalImages,
  averageScore,
  bestScore,
  favoriteCategory
})

    } catch (error) {

      console.error(error)

    }

  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

const categoryCounts = {}

historyData
  .filter(item => !item.storyboard)
  .forEach(item => {

    if (!item.category) return

    categoryCounts[item.category] =
      (categoryCounts[item.category] || 0) + 1

})

const averageConfidence =
  historyData.length
    ? Math.round(

        historyData.reduce(
          (sum, item) => {

            if(item.storyboard){

              return (
                sum +
                (
                  item.storyAnalysis
                    ?.confidence || 0
                )
              )

            }

            return (
              sum +
              (item.confidence || 0)
            )

          },
          0
        ) / historyData.length

      )
    : 0


    const averageImprovement =
  historyData.length
    ? Math.round(

        historyData.reduce(
          (sum, item) => {

            if(item.storyboard){

              return (
                sum +
                (
                  (
                    item.storyAnalysis
                      ?.enhancedStoryScore || 0
                  )
                  -
                  (
                    item.storyAnalysis
                      ?.storyScore || 0
                  )
                )
              )

            }

            return (
              sum +
              (
                (item.enhancedScore || 0)
                -
                (item.originalScore || 0)
              )
            )

          },
          0
        ) / historyData.length

      )
    : 0

const enhancedCount =
  historyData.filter(
    item => item.mode === 'enhanced'
  ).length

const mostUsedMode =

  enhancedCount >= historyData.length / 2
    ? 'Enhanced'
    : 'Original'

    const getScore = (item) => {

  if(item.storyboard){

    return (
      item.storyAnalysis
        ?.enhancedStoryScore ||

      item.storyAnalysis
        ?.storyScore ||

      0
    )

  }

  return (
    item.enhancedScore ||
    item.originalScore ||
    0
  )

}

const bestImage =

  historyData
    .filter(item => !item.storyboard)
    .reduce(
      (best, current) =>

        (
          current.enhancedScore ||
          current.originalScore ||
          0
        )

        >

        (
          best?.enhancedScore ||
          best?.originalScore ||
          0
        )

          ? current

          : best,

      null
    )

const bestStoryboard =

  historyData
    .filter(item => item.storyboard)
    .reduce(
      (best, current) =>

        (
          current.storyAnalysis
            ?.enhancedStoryScore ||

          current.storyAnalysis
            ?.storyScore ||

          0
        )

        >

        (
          best?.storyAnalysis
            ?.enhancedStoryScore ||

          best?.storyAnalysis
            ?.storyScore ||

          0
        )

          ? current

          : best,

      null
    )

  return (
    <div className="max-w-7xl mx-auto py-10">

     <div className="flex items-center gap-4 mb-10">

  <img
    src="/gifs/owl.gif"
    alt="Analytics Mascot"
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
      Analytics Dashboard
    </h1>

    <p className="text-neutral-500 mt-2">
      Discover insights, trends and performance from your creations.
    </p>

  </div>

</div>

      <div className="grid md:grid-cols-6 gap-4 mb-10">

        <div className="bg-blue-50 rounded-xl p-6 shadow">
          <h3 className="text-gray-500">
            Total Generations
          </h3>

          <p className="text-3xl font-bold">
            {stats.totalGenerations}
          </p>
        </div>

        <div className="bg-pink-50 rounded-xl p-6 shadow">

  <h3 className="text-gray-500">
    Storyboards
  </h3>

  <p className="text-3xl font-bold">
    {stats.totalStoryboards}
  </p>

</div>

<div className="bg-cyan-50 rounded-xl p-6 shadow">

  <h3 className="text-gray-500">
    Images
  </h3>

  <p className="text-3xl font-bold">
    {stats.totalImages}
  </p>

</div>

        <div className="bg-green-50 rounded-xl p-6 shadow">
          <h3 className="text-gray-500">
            Average Score
          </h3>

          <p className="text-3xl font-bold">
            {stats.averageScore}
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 shadow">
          <h3 className="text-gray-500">
            Best Score
          </h3>

          <p className="text-3xl font-bold">
            {stats.bestScore}
          </p>
        </div>

     <div className="bg-orange-50 rounded-xl p-6 shadow">

<h3 className="text-gray-500">
  Top Category
</h3>

<p className="text-lg font-bold">
  {stats.favoriteCategory}
</p>

</div>

      </div>
      {/* Category Distribution */}

<h2 className="text-2xl font-bold mb-4">
  Category Distribution
</h2>

<div className="bg-white rounded-xl p-6 shadow mb-10">

  {Object.entries(categoryCounts).map(
    ([category, count]) => (

      <div key={category} className="mb-4">

        <div className="flex justify-between mb-1">

          <span>{category}</span>

          <span>{count}</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-purple-500 h-3 rounded-full"
              style={{
                  width: `${(count / Math.max(stats.totalImages, 1)) * 100}%`
                }}
          />

        </div>

      </div>

    )
  )}

</div>

{/* Prompt Intelligence */}

<h2 className="text-2xl font-bold mb-4">
  Prompt Intelligence Insights
</h2>

<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
      Average Confidence
    </h3>

    <p className="text-4xl font-bold">
      {averageConfidence}%
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
      Enhancement Gain
    </h3>

    <p className="text-4xl font-bold">
      +{averageImprovement}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
      Most Used Mode
    </h3>

    <p className="text-2xl font-bold">
      {mostUsedMode}
    </p>
  </div>

</div>

<h2 className="text-2xl font-bold mb-4">
  Top Creations
</h2>

<div className="grid md:grid-cols-2 gap-6 mb-10">

{bestImage && (

<div
  onClick={() =>
    navigate(`/history/${bestImage._id}`)
  }
  className="
  bg-white
  rounded-2xl
  shadow-lg
  overflow-hidden
  cursor-pointer
  hover:shadow-xl
  transition-all
  "
>

  <img
    src={bestImage.imageUrl}
    alt=""
    className="
    w-full
    h-64
    object-cover
    "
  />

  <div className="p-5">

    <h3 className="text-xl font-bold mb-3">
      🏆 Best Image
    </h3>

    <p>
      Category:
      <strong>
        {" "}
        {bestImage.category}
      </strong>
    </p>

    <p>
      Score:
      <strong className="text-green-600">
        {" "}
        {
          bestImage.enhancedScore ||
          bestImage.originalScore
        }
      </strong>
    </p>

    <p>
      Confidence:
      <strong>
        {" "}
        {bestImage.confidence}%
      </strong>
    </p>

  </div>

</div>

)}

{bestStoryboard && (

<div
  onClick={() =>
    navigate(`/history/${bestStoryboard._id}`)
  }
  className="
  bg-white
  rounded-2xl
  shadow-lg
  overflow-hidden
  cursor-pointer
  hover:shadow-xl
  transition-all
  "
>

  <img
    src={
      bestStoryboard.storyboardScenes?.[0]
        ?.imageUrl
    }
    alt=""
    className="
    w-full
    h-64
    object-cover
    "
  />

  <div className="p-5">

    <h3 className="text-xl font-bold mb-3">
      🎬 Best Storyboard
    </h3>

    <p>
      Genre:
      <strong>
        {" "}
        {
          bestStoryboard.storyAnalysis
            ?.genre
        }
      </strong>
    </p>

    <p>
      Score:
      <strong className="text-green-600">
        {" "}
        {
          bestStoryboard.storyAnalysis
            ?.enhancedStoryScore
        }
      </strong>
    </p>

    <p>
      Confidence:
      <strong>
        {" "}
        {
          bestStoryboard.storyAnalysis
            ?.confidence
        }%
      </strong>
    </p>

  </div>

</div>

)}

</div>



    </div>
  )
}

export default Analytics