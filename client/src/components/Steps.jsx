import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center my-32 overflow-hidden"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      {/* 🌿 LEFT PLANT GIF */}
      <img
        src="/gifs/plant.gif"
        alt=""
        className="absolute left-0 top-1/2 -translate-y-1/2
        h-[420px] opacity-40 hidden lg:block pointer-events-none"
      />

      {/* 🌿 RIGHT PLANT GIF */}
      <img
        src="/gifs/plant.gif"
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2
        h-[420px] opacity-40 hidden lg:block pointer-events-none scale-x-[-1]"
      />

      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        How it works
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Transform Words Into Stunning Images
      </p>

      <div className="relative w-full max-w-3xl space-y-6">

        {/* Vertical connector line */}
        <div className="absolute left-6 top-10 bottom-10 w-px bg-gray-200/70 hidden sm:block" />

        {stepsData.map((item, index) => (
          <div
            key={index}
            className="relative flex items-center gap-6 p-6 px-8
            bg-white/20 rounded-lg shadow-md border
            cursor-pointer transition-all duration-300
            hover:scale-[1.02] hover:shadow-lg"
          >

            {/* Step number */}
            <div className="text-2xl font-semibold text-indigo-400 w-12">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Icon */}
            <div className="p-2 rounded-md bg-indigo-100/70">
              <img width={30} src={item.icon} alt="" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-xl font-medium">
                {item.title}
              </h2>
              <p className="text-gray-500">
                {item.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default Steps
