import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
            scrollTo(0,0)
        } else {
            scrollTo(0,0)
            setShowLogin(true)
        }
    }

    return (
        <motion.div
  className="pb-16 bg-[#FFF1F5]"

            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* WRAPPER */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 px-6">

                {/* GIF ON LEFT (ONLY ADDITION / POSITION CHANGE) */}
                <img
                    src="/gifs/magic.gif"
                    alt="Magic animation"
                    className="w-64 md:w-80 opacity-90"
                />

                {/* EXISTING CONTENT (UNCHANGED) */}
                <div className="text-center">
                    <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
                        See the magic. Try now
                    </h1>

                    <button
                        onClick={onClickHandler}
                        className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'
                    >
                        Generate Images
                        <img className='h-6' src={assets.star_group} alt="" />
                    </button>
                </div>

            </div>
        </motion.div>
    )
}

export default GenerateBtn
