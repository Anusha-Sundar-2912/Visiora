import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)
  const [credit, setCredit] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/credits`,
        { headers: { token } }
      )

      if (data.success) {
        setCredit(data.credits)
        setUser(data.user)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  // 🧠 Prompt Enhancement Engine (Gemini / LLM-based, Phase 3)
  const enhancePrompt = async (prompt) => {
    const cleanPrompt = prompt?.trim()
    if (!cleanPrompt) return prompt

    // 🔹 Normalized cache key
    const cacheKey = `enhance_${cleanPrompt.toLowerCase()}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/enhance-prompt`,
        { prompt: cleanPrompt },
        { headers: { token } }
      )

      if (data?.success && data.enhancedPrompt) {
        sessionStorage.setItem(cacheKey, data.enhancedPrompt)
        return data.enhancedPrompt
      }

      toast.error("Prompt enhancement failed")
      return cleanPrompt

    } catch (error) {
      console.error("Enhance prompt error:", error)
      toast.error("Enhancement service unavailable")
      return cleanPrompt
    }
  }

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      )

      if (data.success) {
        loadCreditsData()
        return data.resultImage
      } else {
        toast.error(data.message)
        loadCreditsData()
        if (data.creditBalance === 0) {
          navigate("/buy")
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    setUser(null)
  }

  useEffect(() => {
    if (token) {
      loadCreditsData()
    }
  }, [token])

  const value = {
    token, setToken,
    user, setUser,
    showLogin, setShowLogin,
    credit, setCredit,
    loadCreditsData,
    backendUrl,

    generateImage,
    enhancePrompt,

    logout
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
