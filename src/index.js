import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./auth/auth.route.js"
import jobRoutes from "./jobs/job.route.js"
import userRoutes from "./user/user.routes.js"

import { connectDB } from "./config/db.js"
import job from "./utils/cronjob.js"




const app = express()
dotenv.config();
const PORT = process.env.PORT || 3000


job.start();
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  res.status(200).send("Get request");
});

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)



app.listen(PORT, () => {
        connectDB(),
      console.log(`✅ Server is listening at http://localhost:${PORT}`)
    })
 


