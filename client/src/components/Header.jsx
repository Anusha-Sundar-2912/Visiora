import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <motion.div
            className="relative min-h-screen flex justify-center items-center text-center overflow-hidden
            bg-gradient-to-br from-[#fde2e4] via-[#fbcfe8] to-[#f5d0fe]"
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >

            {/* 🌸 Soft ambient glow for pink background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_60%)]" />
            </div>

            {/* 🌸 Ambient floating orbs (pink background only) */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute rounded-full bg-white/25 blur-2xl"
                        style={{
                            width: `${Math.random() * 120 + 80}px`,
                            height: `${Math.random() * 120 + 80}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: Math.random() * 14 + 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* 🐱 Resume-safe mascot (top-left) */}
            <motion.img
                src="/gifs/cat-laptop.gif"
                alt="creative mascot"
                className="absolute top-14 left-14 w-36 opacity-95 pointer-events-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Purple card */}
            <div className="relative overflow-hidden rounded-3xl px-10 py-14
            bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600
            shadow-[0_30px_80px_rgba(99,102,241,0.45)]
            max-w-3xl mx-4">

                {/* Floating particles INSIDE purple box */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 26 }).map((_, i) => (
                        <motion.span
                            key={i}
                            className="absolute rounded-full bg-white/60 blur-[1px]"
                            style={{
                                width: `${Math.random() * 10 + 6}px`,
                                height: `${Math.random() * 10 + 6}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -60, 0],
                                opacity: [0.2, 0.7, 0.2],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Content layer */}
                <div className="relative z-10">

                    {/* Badge */}
                    <motion.div
                        className="text-indigo-700 inline-flex items-center gap-2 bg-white/80
                        px-6 py-1 rounded-full border border-white/40 mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <p>Best text to image generator</p>
                        <img src={assets.star_icon} alt="" />
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        className="mx-auto mt-4 text-4xl sm:text-7xl font-bold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 2 }}
                    >
                        Turn text to{' '}
                        <span className="bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                            image
                        </span>
                        , in seconds.
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="max-w-xl mx-auto mt-6 text-white/90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Unleash your creativity with AI. Turn your imagination into visual art in seconds –
                        just type, and watch the magic happen.
                    </motion.p>

                    {/* CTA */}
                    <motion.button
                        className="mt-8 px-12 py-3 flex items-center gap-2 rounded-full
                        bg-white text-indigo-700 font-semibold
                        hover:bg-pink-50 shadow-lg mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        onClick={onClickHandler}
                    >
                        Generate Images <img className="h-6" src={assets.star_group} alt="" />
                    </motion.button>

                </div>
            </div>

        </motion.div>
    )
}

export default Header
