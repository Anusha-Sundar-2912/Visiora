import axios from 'axios'
import FormData from 'form-data'
import { performance } from 'perf_hooks'
import userModel from '../models/userModel.js'

// 🎨 Image generation (Kept as is)
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body
    if (!userId || !prompt) return res.json({ success: false, message: 'Missing Details' })

    const user = await userModel.findById(userId)
    if (!user || user.creditBalance <= 0) {
        return res.json({ success: false, message: 'No Credit Balance or User not found' })
    }

    const startTime = performance.now()
    const formdata = new FormData()
    formdata.append('prompt', prompt)

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formdata,
      {
        headers: { ...formdata.getHeaders(), 'x-api-key': process.env.CLIPDROP_API },
        responseType: 'arraybuffer'
      }
    )

    const base64Image = Buffer.from(response.data).toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`
    const latencyMs = Math.round(performance.now() - startTime)

    const updatedCredits = user.creditBalance - 1
    await userModel.findByIdAndUpdate(user._id, { creditBalance: updatedCredits })

    res.json({ success: true, message: 'Image Generated', resultImage, latencyMs, creditBalance: updatedCredits })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Image generation failed' })
  }
}

// 🧠 Prompt enhancement (SMART DISCOVERY)
export const enhancePrompt = async (req, res) => {
  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    if (!prompt || !prompt.trim()) {
      return res.json({ success: false, message: 'Prompt required' });
    }

    // Step 1: List models to see what your key CAN use
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const listRes = await axios.get(listUrl);
    
    // Find the first model that supports "generateContent"
    const availableModel = listRes.data.models.find(m => 
      m.supportedGenerationMethods.includes('generateContent') && 
      (m.name.includes('flash') || m.name.includes('pro'))
    );

    if (!availableModel) {
      throw new Error('No supported Gemini models found for this API key.');
    }

    console.log(`Using discovered model: ${availableModel.name}`);

    // Step 2: Use the discovered model name
    const url = `https://generativelanguage.googleapis.com/v1beta/${availableModel.name}:generateContent?key=${API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [{
          parts: [{
            text: `Expand this image prompt into a detailed version with style, lighting, and mood: ${prompt}. Return ONLY the enhanced text.`
          }]
        }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const enhancedPrompt = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return res.json({ success: true, enhancedPrompt });

  } catch (error) {
    console.error('Gemini Discovery Error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Enhancement service unavailable. Please check your console for available models.'
    });
  }
};