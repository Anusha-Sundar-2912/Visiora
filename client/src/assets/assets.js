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
    title: 'Describe Your Vision',
    description:
      'Type a phrase, sentence, or paragraph that clearly describes the image you want to generate.',
    icon: step_icon_1,
  },
  {
    title: 'Watch the Magic',
    description:
      'Our AI engine instantly transforms your prompt into a high-quality, visually stunning image.',
    icon: step_icon_2,
  },
  {
    title: 'Download & Share',
    description:
      'Download your image in seconds or share it directly across your favorite platforms.',
    icon: step_icon_3,
  },
]

export const testimonialsData = [
  {
    image: profile_img_1,
    name: 'Donald Jackman',
    role: 'Graphic Designer',
    stars: 5,
    text:
      'Visiora has completely changed my workflow. I can generate clean visuals for client projects in seconds, saving hours of manual design work.',
  },
  {
    image: profile_img_2,
    name: 'Richard Nelson',
    role: 'Content Creator',
    stars: 5,
    text:
      'As a content creator, speed matters. Visiora helps me turn ideas into eye-catching visuals instantly for social media and campaigns.',
  },
  {
    image: profile_img_3,
    name: 'Ayaan Verma',
    role: 'Startup Founder',
    stars: 5,
    text:
      'We use Visiora for marketing creatives and product mockups. The results are consistently impressive and incredibly easy to generate.',
  },
]

export const plans = [
  {
    id: 'Basic',
    price: 10,
    credits: 100,
    desc: 'Best for personal use.',
  },
  {
    id: 'Advanced',
    price: 50,
    credits: 500,
    desc: 'Best for business use.',
  },
  {
    id: 'Business',
    price: 250,
    credits: 5000,
    desc: 'Best for enterprise use.',
  },
]
