import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  razorpay_logo,
  stripe_logo,
}
export const stepsData = [
  {
    title: 'Describe Your Idea',
    description:
      'Enter a creative concept, story, product, scene, or visual idea you want to transform into professional-quality content.',
    icon: step_icon_1,
  },
  {
    title: 'Analyze & Enhance',
    description:
      'Visiora evaluates your prompt, identifies weaknesses, improves clarity, and generates optimization insights with quality scores.',
    icon: step_icon_2,
  },
  {
    title: 'Generate & Create',
    description:
      'Create enhanced images, cinematic storyboards, and track performance through intelligent analytics and creative insights.',
    icon: step_icon_3,
  },
]
export const testimonialsData = [
  {
    image: profile_img_1,
    name: 'Ethan Brooks',
    role: 'Creative Director',
    stars: 5,
    text:
      'Visiora has transformed the way our team develops concepts. The storyboard generation and prompt enhancement features help us move from ideas to production-ready visuals significantly faster.',
  },
  {
    image: profile_img_2,
    name: 'Noah Carter',
    role: 'Content Strategist',
    stars: 5,
    text:
      'The prompt analysis and creative insights provide a level of refinement that traditional visual tools simply do not offer. It has become an essential part of our content workflow.',
  },
  {
    image: profile_img_3,
    name: 'Ayaan Verma',
    role: 'Brand Consultant',
    stars: 5,
    text:
      'From campaign concepts to visual storytelling, Visiora helps us explore creative directions with confidence. The quality scoring and storyboard features are particularly valuable.',
  },
]

export const plans = [
  {
    id: 'Professional',
    price: 249,
    credits: 5,
    desc: 'For individual creators and professionals.',
  },
  {
    id: 'Premium',
    price: 499,
    credits: 10,
    desc: 'For advanced creative workflows and frequent usage.',
  },
  {
    id: 'Enterprise',
    price: 999,
    credits: 15,
    desc: 'For agencies, teams, and high-volume content production.',
  },
]
