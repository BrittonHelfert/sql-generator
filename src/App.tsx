import { useState } from "react"
import CodeDisplay from "./components/CodeDisplay"
import MessagesDisplay from "./components/MessagesDisplay"

const API_KEY: string = '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'

interface ChatData {
  role: string,
  content: string
}

const App = () => {

  const [chat, setChat] = useState<ChatData[]>([])
  const [value, setValue] = useState<string>("")

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      }
      const response = await fetch("http://localhost:8000/completions", options)
      const data = await response.json()
      const userMessage = {
        role: "user",
        content: value
      }
      setChat(oldChat => [...oldChat, data.choices[0].message, userMessage])
    } catch (error) {
      console.error(error)
    }
  }

  const filteredUserMessages = chat.filter(message => message.role === "user")
  const latestCode = chat.filter(message => message.role === "assistant").pop()

  const clearChat = () => {
    setValue("")
    setChat([])
  }

  return (
    <div className="app">
        <h1>SQL QUERY GENERATOR</h1>
        <MessagesDisplay userMessages={filteredUserMessages}/>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <CodeDisplay text={latestCode?.content || ""}/>
        <div className="button-container">
            <button id="get-query" onClick={getQuery}>Get Query</button>
            <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
        </div>
    </div>
  )
}

export default App;
