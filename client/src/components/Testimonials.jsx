import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

// ✅ profile images
import profile1 from '../assets/profile_img_1.png'
import profile2 from '../assets/profile_img_2.png'
import profile3 from '../assets/profile_img_3.png'

const profileImages = [profile1, profile2, profile3]

const Testimonials = () => {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center py-28
      bg-gradient-to-b from-[#ffe8dc] via-[#fff1ea] to-white"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-gray-900">
        Customer testimonials
      </h1>
      <p className="text-gray-600 mb-14">
        What Our Users Are Saying
      </p>

      {/* cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white/70 backdrop-blur
            border border-white/50 p-10 rounded-2xl
            shadow-lg hover:shadow-2xl w-80
            cursor-pointer transition-all"
          >
            {/* soft glow */}
            <div
              className="absolute inset-0 rounded-2xl
              bg-gradient-to-tr from-indigo-200/20 to-pink-200/20
              opacity-0 hover:opacity-100 transition-opacity -z-10"
            />

            <div className="flex flex-col items-center text-center">
              
              {/* avatar */}
              <div className="relative">
                <img
                  src={profileImages[index]}
                  alt={testimonial.name}
                  className="rounded-full w-14 h-14 object-cover
                  ring-2 ring-white shadow-md"
                />
              </div>

              <h2 className="text-lg font-semibold mt-4">
                {testimonial.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {testimonial.role}
              </p>

              {/* stars */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.stars)
                  .fill('')
                  .map((_, i) => (
                    <motion.img
                      key={i}
                      src={assets.rating_star}
                      alt="rating"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    />
                  ))}
              </div>

              {/* text */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Testimonials
