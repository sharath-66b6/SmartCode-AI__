import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [intro, setIntro] = useState(true) // Show intro initially

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setIntro(false) // Hide intro when review starts
    setLoading(true) // Show loading animation
    setReview("🔍 Analyzing your code...") // First loading message

    setTimeout(() => {
      setReview("💭 Thinking and processing...") // Second message after 1.5s
    }, 1500)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/ai/get-review`, { code })
      setReview(response.data) // Show actual review
    } catch (error) {
      setReview("❌ Error fetching review. Please try again.") // Handle errors
    } finally {
      setLoading(false) // Stop loading
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "14px",
                width: "100%",
                minHeight: "100%",
                overflow: "auto"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
              {loading ? "⏳ Reviewing..." : "Review"}
          </div>
        </div>

        <div className="right">
          {intro ? (
            <div className="intro">
              <h2>🚀  SmartCode AI</h2>
              <p>
              <strong>AI-Powered Code Reviewer</strong> is a <strong>full-stack MERN</strong> (MongoDB, Express, React, Node.js) application that leverages AI to analyze, review, and provide feedback on source code. It helps developers improve their code quality, identify potential issues, and learn best practices.
              </p>
              <br />
              <h3>🌟 Key Features</h3>
              <ul>
                <li>✔️ Interactive Code Editor with Syntax Highlighting</li>
                <li>✔️ AI-powered Code Review & Feedback</li>
                <li>✔️ Supports Multiple Programming Languages</li>
                <li>✔️ Real-time Processing with Loading Animations</li>
                <li>✔️ Simple & Intuitive User Interface</li>
                <li>✔️ Built using **MERN Stack** (MongoDB, Express.js, React, Node.js)</li>
              </ul>
              <br />
              <h3>🔧 Technologies Used</h3>
              <p><strong>Frontend:</strong> React, Prism.js, Axios, Markdown Renderer</p>
              <p><strong>Backend:</strong> Node.js, Express.js, Cors, Gemini API </p>
              <p><strong>Database:</strong> MongoDB </p>
              <p><strong>Deployment:</strong> Vercel (Frontend), Render/Heroku (Backend)</p>
              <br />
              <h3>📌 Connect with Me</h3>
              <p><strong>Name:</strong> Sharath Kumar Reddy</p>
              <p><strong>Email:</strong> <a href="mailto:sharathkumarr924@gmail.com">sharathkumarr924@gmail.com</a></p>
              <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sharath-kumar-reddy-software-engineer" target="_blank" rel="noopener noreferrer">linkedin.com/in/Sharath</a></p>
              <p><strong>GitHub:</strong> <a href="https://github.com/sharath-66b6" target="_blank" rel="noopener noreferrer">github.com/Sharath</a></p>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}

export default App
