import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from '@clerk/express'
import AiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configerations/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express()

await connectCloudinary()

app.use(cors())
app.use(express.json())

app.use(clerkMiddleware())

app.get('/', (req, res)=> res.send("Server is Running...."))

app.use(requireAuth())

app.use('/api/ai', AiRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
})