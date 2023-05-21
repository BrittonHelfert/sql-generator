import express, {Application, Request, Response} from "express"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
const PORT: number = 8000

const app: Application = express()
app.use(cors())
app.use(express.json())

const API_KEY = process.env.API_KEY

app.post("/completions", async (req: Request, res: Response) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: 
            [
                {role: "user", 
                content: "Create a SQL request to " + req.body.message + ". Only give me the code and nothing other words."}
            ]
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})

app.listen(PORT, () => console.log(`Your server is running on Port ${PORT}`))