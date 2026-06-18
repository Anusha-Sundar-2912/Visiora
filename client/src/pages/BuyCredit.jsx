import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'

const BuyCredit = () => {

  const { backendUrl, loadCreditsData, user, token, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const paymentStripe = async (planId) => {
    try {

      if (!user) {
        setShowLogin(true)
        return
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-stripe',
        { planId },
        { headers: { token } }
      )

      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      className='min-h-[80vh] text-center pt-14 mb-10'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>

      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>
        Choose the plan
      </h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
   {plans.map((item, index) => (

 <div
  key={index}
  className={`
    relative
    bg-white
    drop-shadow-sm
    border
    rounded-lg
    py-12
    px-8
    text-gray-600
    hover:scale-105
    transition-all
    duration-500

    ${item.id === 'Premium'
      ? 'border-purple-500 shadow-lg'
      : ''}
  `}
>

  {item.id === 'Premium' && (
    <div
      className="
      absolute
      top-4
      right-4
      bg-purple-600
      text-white
      text-xs
      font-semibold
      px-3
      py-1
      rounded-full
      "
    >
      Most Popular
    </div>
  )}

  <img width={40} src={assets.logo_icon} alt="" />

            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>

            <p className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span> / {item.credits} credits
            </p>

            <div className='flex flex-col mt-4'>
<button
  onClick={() => paymentStripe(item.id)}
  className='
    w-full
    flex
    items-center
    justify-center
    gap-2
    mt-2
    py-3
    rounded-md
    bg-purple-600
    text-white
    font-medium
    hover:bg-purple-700
    transition-all
  '
>
  Purchase Credits
</button>
            </div>

          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
