import userModel from "../models/userModel.js"
import transactionModel from "../models/transactionModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import stripe from "stripe";

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, user: { name: user.name } })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API Controller function to get user available credits data
const userCredits = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)

        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Stripe Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

// Payment API to add credits (Stripe)
const paymentStripe = async (req, res) => {
    try {
        const { userId, planId } = req.body
        const { origin } = req.headers

        const userData = await userModel.findById(userId)

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({ success: false, message: 'plan not found' })
        }

        date = Date.now()

        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const line_items = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Credit Purchase"
                },
                unit_amount: newTransaction.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&transactionId=${newTransaction._id}`,
            cancel_url: `${origin}/verify?success=false&transactionId=${newTransaction._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API Controller function to verify Stripe payment
const verifyStripe = async (req, res) => {
    try {
        const { transactionId, success } = req.body

        if (success === 'true') {
            const transactionData = await transactionModel.findById(transactionId)
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Already Verified' })
            }

            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id, { creditBalance })
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {
    registerUser,
    loginUser,
    userCredits,
    paymentStripe,
    verifyStripe
}
