# 🎨 Visiora — AI Prompt Intelligence & Image Generation Platform

> **Think Better Prompts. Generate Better Images.**

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

![Home](<img width="1918" height="1061" alt="Screenshot 2026-06-18 164338" src="https://github.com/user-attachments/assets/3f979b12-fcc7-4c24-876f-5439f825ada5" />)

---

## ✨ Prompt Enhancement

![Prompt Enhancement](<img width="1876" height="1008" alt="Screenshot 2026-06-28 103637" src="https://github.com/user-attachments/assets/3a2e9ddc-915d-40f9-8c09-e3fbcde792b2" />)

---

## 🎨 Image Generator

![Image Generator]()

---

## 🧠 AI Analysis

![AI Analysis](screenshots/analysis.png)

---

## 📖 Storyboard

![Storyboard](screenshots/storyboard.png)

---

## 📊 Analytics Dashboard

![Analytics](screenshots/analytics.png)

---

## 📜 Prompt History

![History](screenshots/history.png)

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

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Anusha Sundar**

B.Tech Computer Science Engineering

AI • Full Stack Development • Backend Engineering

---

## ⭐ If you like this project, consider giving it a star!<img width="1918" height="1061" alt="Screenshot 2026-06-18 164338" src="https://github.com/user-attachments/assets/2ab56854-1c25-4a2c-b25b-01338efa941e" />
