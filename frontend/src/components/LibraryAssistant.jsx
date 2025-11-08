import React, { useState } from "react";
import axios from "axios";

const LibraryAssistant = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setQuery("");
    setLoading(true);

    try {
      // ✅ Updated to match your live Render backend
      const res = await axios.post("https://library-ai-backend.onrender.com/ask-ai", { query });

      if (res.data.ok && res.data.reply) {
        // ✅ Use the real AI reply from backend
        setMessages((prev) => [...prev, { role: "ai", text: res.data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: "❌ AI failed to respond properly." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Network error. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
        🤖 Library AI Assistant
      </h1>

      <div className="h-80 overflow-y-auto border p-3 bg-gray-50 rounded-md mb-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-20">
            Start chatting with your Library AI 👋
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-3 rounded-md ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto w-fit"
                : "bg-gray-200 w-fit"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-500 mt-2 italic">AI is thinking...</p>}
      </div>

      <div className="flex">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about books, topics, or AI..."
          className="flex-1 border rounded-md p-2"
        />
        <button
          onClick={sendQuery}
          disabled={loading}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LibraryAssistant;
