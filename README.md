# 🎨 Visiora — AI Prompt Intelligence & Creative Generation Platform

> **Craft exceptional prompts, enhance them with AI intelligence, and transform imagination into stunning visuals.**

Visiora is a full-stack AI-powered platform that transforms simple ideas into stunning visuals through intelligent prompt enhancement, AI-powered analysis, storyboard generation, analytics, and high-quality image creation.

Unlike traditional text-to-image tools, Visiora first understands, critiques, improves, and scores your prompt before generating an image—helping users create significantly better AI-generated content with minimal effort.

---

## 🌐 Live Demo

🚀 **Live Application:**  
https://visiora-nine.vercel.app/

---

# ✨ Features

## 🤖 AI Prompt Enhancement

Transform simple prompts into professional-quality prompts using AI-powered prompt engineering.

**Example**

**Input**

> cat

**Enhanced Prompt**

> A majestic orange tabby cat sitting on an old wooden windowsill during golden hour, cinematic lighting, ultra-detailed fur, shallow depth of field, highly realistic photography.

---

## 🧠 AI Prompt Intelligence

Every prompt receives a complete AI-powered evaluation.

Visiora analyzes:

- Prompt Quality Score
- Enhanced Score
- Confidence Score
- Category Detection
- Prompt Strengths
- Prompt Weaknesses
- AI Critique
- Improvement Suggestions

Rather than simply generating images, Visiora helps users learn how to write better prompts.

---

## 🎨 AI Image Generation

Generate high-quality AI images from enhanced prompts.

Features include:

- High-resolution image generation
- Fast response times
- Cloud image storage
- One-click image download
- Secure generation history

---

## 📖 Storyboard Generator

Turn complete stories into cinematic visual storyboards.

Automatically generates:

- Story Analysis
- Genre Detection
- Narrative Complexity
- Emotional Impact
- Visual Consistency
- Scene Breakdown
- Camera Directions
- Lighting Suggestions
- Mood
- Scene-specific Image Prompts

Perfect for:

- Film concepts
- Storyboarding
- Animation planning
- Game design
- Visual storytelling

---

## 📊 Analytics Dashboard

Track prompt performance through an interactive analytics dashboard.

Includes:

- Total Images Generated
- Average Confidence
- Prompt Improvement Gain
- Category Distribution
- Most Used Generation Mode
- Best Performing Prompt

---

## 📜 Prompt History

Every generation is automatically stored.

View:

- Original Prompt
- Enhanced Prompt
- Generated Image
- AI Analysis
- Prompt Scores
- Generation Date

---

## 📄 PDF Export

Export storyboard reports containing:

- Story Intelligence
- AI Analysis
- Scene Images
- Camera Directions
- Lighting
- Scene Prompts

Ideal for presentations, creative planning, and production workflows.

---

## 🔐 Secure Authentication

- User Registration
- Login
- JWT Authentication
- Protected Routes
- Credit Management
- Session Handling

---

## ☁️ Cloud Storage

Generated images are securely stored using Cloudinary.

Benefits:

- Persistent image URLs
- Optimized delivery
- Fast loading
- Secure cloud storage

---

# 🚀 Workflow

```text
User Prompt
      │
      ▼
AI Prompt Analysis
      │
      ▼
Prompt Enhancement
      │
      ▼
Quality Scoring
      │
      ▼
Image Generation
      │
      ▼
History Storage
      │
      ▼
Analytics Dashboard
```

---

# 📸 Screenshots

## 🏠 Home
<img width="1917" height="1158" alt="Screenshot 2026-07-22 104036" src="https://github.com/user-attachments/assets/6f077866-8dfe-49ac-bd6b-b038b7371ac4" />
<img width="1917" height="1155" alt="Screenshot 2026-07-22 104113" src="https://github.com/user-attachments/assets/76dafb92-6395-48e0-81d3-cb821214ccaf" />
<img width="1917" height="1153" alt="Screenshot 2026-07-22 104127" src="https://github.com/user-attachments/assets/e3838678-bf0b-4b8c-bcb9-6081e758ceac" />
<img width="1917" height="1151" alt="Screenshot 2026-07-22 104138" src="https://github.com/user-attachments/assets/a4d26420-0f9f-4528-bde2-0714d371129b" />
<img width="1917" height="1153" alt="Screenshot 2026-07-22 104152" src="https://github.com/user-attachments/assets/e43d249c-8515-4a18-a9ae-952865abe116" />

---

## ✨ Prompt Enhancement

<img width="1917" height="1160" alt="Screenshot 2026-07-22 104619" src="https://github.com/user-attachments/assets/5bd9ca61-d576-4027-bc56-d26e0857e0db" />

---

## 🎨 Image Generator

<img width="1917" height="1155" alt="Screenshot 2026-07-22 104714" src="https://github.com/user-attachments/assets/e0d04bfa-df7d-41bb-8ee9-08076ed72296" />
<img width="1916" height="1156" alt="Screenshot 2026-07-22 130105" src="https://github.com/user-attachments/assets/075a457e-dc5a-49e0-b781-9c28f168de5a" />

---

## 📖 Storyboard

<img width="1906" height="1150" alt="Screenshot 2026-07-22 125707" src="https://github.com/user-attachments/assets/fc31231d-d078-4f94-b8f4-276107652f7d" />
<img width="1917" height="1160" alt="Screenshot 2026-07-22 125805" src="https://github.com/user-attachments/assets/ffdc319d-66ff-471c-9f4c-1c7591e2b51e" />

---

## 📊 Analytics Dashboard

<img width="1917" height="1158" alt="Screenshot 2026-07-22 130159" src="https://github.com/user-attachments/assets/9ea936a3-310c-445f-9174-a0a405ebecc4" />

---

## 📜 Prompt History

<img width="1917" height="1156" alt="Screenshot 2026-07-22 125903" src="https://github.com/user-attachments/assets/22b4c925-9008-4f0d-a7e1-e16862563a4e" />

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## AI Services

- Groq (Llama 3.3 70B)
- ClipDrop Text-to-Image API

## Cloud Storage

- Cloudinary

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```text
Visiora/

├── client/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── assets/
│   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend

```env
MONGODB_URI=

JWT_SECRET=

GROQ_API_KEY=

CLIPDROP_API_KEY=

CLOUDINARY_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_SECRET=
```

## Frontend

```env
VITE_BACKEND_URL=
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/Visiora.git
```

Navigate into the project

```bash
cd Visiora
```

Install backend dependencies

```bash
cd server
npm install
```

Install frontend dependencies

```bash
cd ../client
npm install
```

Run the backend

```bash
npm run server
```

Run the frontend

```bash
npm run dev
```

---

# 🎯 Core Functionalities

- AI Prompt Engineering
- Prompt Enhancement
- Prompt Quality Scoring
- AI Image Generation
- Storyboard Generation
- Story Intelligence
- PDF Export
- Analytics Dashboard
- Prompt History
- Secure Authentication
- Credit Management
- Cloud Image Storage
- Responsive UI

---

# 🌐 REST API

## Authentication

```http
POST /api/user/register
POST /api/user/login
GET  /api/user/credits
```

---

## Prompt Intelligence

```http
POST /api/image/enhance-prompt
```

---

## Image Generation

```http
POST /api/image/generate-image
```

---

## Storyboard

```http
POST /api/image/analyze-story
POST /api/image/storyboard
```

---

## History

```http
GET /api/image/history
GET /api/image/history/:id
```

---

# 🌟 Highlights

- 🚀 Full-Stack AI Platform
- 🤖 Intelligent Prompt Engineering
- 🎨 AI Image Generation
- 📖 Storyboard Generation
- 📊 Analytics Dashboard
- 📜 Prompt History
- 📄 PDF Export
- ☁️ Cloud Storage
- 🔐 JWT Authentication
- 📱 Fully Responsive UI
- ⚡ Production-Ready Architecture
- 🌐 RESTful Backend APIs

---

# 🔮 Future Improvements

- 🎥 AI Video Generation
- 🖌️ Image Editing
- 🔁 Image Variations
- 🎨 Style Presets
- 🌍 Multi-language Prompting
- 🖼️ Public Gallery
- 👥 Team Collaboration
- 📱 Mobile Application

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add awesome feature"
```

4. Push your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

## ⭐ If you like this project, consider giving it a star!
