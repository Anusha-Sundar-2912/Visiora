import React from 'react'
import { motion } from 'framer-motion'
import witchCake from '../assets/witch-cake.png'

const Description = () => {
  return (
    <motion.section
      className="relative my-32 px-6 md:px-16 lg:px-24"
      initial={{ opacity: 0.2, y: 80 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* soft background wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#faf7ff] via-white to-white" />

      {/* heading */}
      <div className="text-center mb-16">
<h1 className="text-3xl sm:text-4xl font-semibold mb-2">
  Visual Storytelling
</h1>
        <p className="text-gray-500">
  Every great creation starts with an idea
</p>
      </div>

      {/* content wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* image column */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.03, rotate: 0.3 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 blur-2xl" />
            <img
              src={witchCake}
              alt="AI generated artwork preview"
              className="relative w-80 xl:w-96 rounded-2xl shadow-2xl border border-white/60"
            />
          </motion.div>
        </div>

        {/* text column */}
        <div className="max-w-2xl">
         <h2 className="text-2xl sm:text-3xl font-medium mb-6">
  Bring Stories to Life
</h2>

          <p className="text-gray-600 mb-5 leading-relaxed text-justify">
  Transform concepts, scenes, and narratives into compelling visual
  experiences. Whether you're exploring a creative idea, building a
  product concept, or crafting a cinematic sequence, Visiora helps
  turn imagination into tangible visuals.
</p>

<p className="text-gray-600 leading-relaxed text-justify">
  From striking images to cinematic storyboards, every creation begins
  with inspiration. Explore creative possibilities, refine concepts,
  and transform ideas into memorable visual experiences.
</p>

        </div>

      </div>
    </motion.section>
  )
}

export default Description
