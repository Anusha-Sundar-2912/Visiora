import mongoose from "mongoose";

const generationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  prompt: String,

  enhancedPrompt: String,

  imageUrl: String,

  originalScore: Number,

  enhancedScore: Number,

  confidence: Number,

  category: String,

  strengths: [String],

  critic: [String],

  breakdown: {
    subjectClarity: Number,
    visualDetail: Number,
    lighting: Number,
    composition: Number,
    styleDefinition: Number,
    sceneContext: Number,
    technicalQuality: Number
  },

latencyMs: Number,

mode: String,

storyboard: {
  type: Boolean,
  default: false
},
storyboardScenes: [
  {
    title: String,
    visual: String,
    camera: String,
    mood: String,
    lighting: String,
    imagePrompt: String,
    imageUrl: String
  }
],

storyAnalysis: {

  genre: String,

  storyScore: Number,

  enhancedStoryScore: Number,

  confidence: Number,

  enhancedStory: String,

  narrativeComplexity: Number,

  emotionalImpact: Number,

  visualConsistency: Number,

  strengths: [String],

  weaknesses: [String]

},

createdAt: {
  type: Date,
  default: Date.now
}

});

generationSchema.index({
  userId: 1,
  createdAt: -1
})

export default mongoose.model(
  "generation",
  generationSchema
);