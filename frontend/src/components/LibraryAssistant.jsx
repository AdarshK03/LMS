import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ───────────────── Typing Indicator ───────────────── */
const TypingIndicator = () => (
  <div className="typing text-gray-400 text-xl tracking-widest">
    <span>.</span><span>.</span><span>.</span>
  </div>
);

const LibraryAssistant = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendQuery = async () => {
    if (!query.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://library-ai-backend.onrender.com/ask-ai",
        { query }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data?.reply || "AI failed to respond.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuery();
    }
  };

  return (
    <div className="h-screen bg-[#0b0f1a] text-gray-100 flex flex-col">

      {/* ───────────── Header ───────────── */}
      <header className="border-b border-white/10 bg-[#0f1525] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
            AI
          </div>
          <div>
            <h1 className="font-semibold text-lg">Library AI Assistant</h1>
            <p className="text-xs text-gray-400">
              IBM watsonx · Granite · Cloudant
            </p>
          </div>
        </div>
      </header>

      {/* ───────────── Chat Area ───────────── */}
      <main className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-24">
              Ask about books, availability, or academic topics
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-5 py-4 rounded-2xl shadow-lg border ${
                  msg.role === "user"
                    ? "bg-blue-600/90 border-blue-500/40"
                    : "bg-[#11162a] border-white/10"
                }`}
              >
                {msg.role === "ai" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-3 leading-relaxed">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 mb-3 space-y-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-3 space-y-1">
                          {children}
                        </ol>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),
                      code: ({ children }) => (
                        <code className="bg-black/40 px-1 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-black/60 p-4 rounded-xl overflow-x-auto mb-3 text-sm">
                          {children}
                        </pre>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto mb-4">
                          <table className="min-w-full border border-white/10 rounded-xl overflow-hidden">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-blue-600/20 text-blue-300">
                          {children}
                        </thead>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-white/10">
                          {children}
                        </tbody>
                      ),
                      tr: ({ children }) => (
                        <tr className="hover:bg-white/5 transition">
                          {children}
                        </tr>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-3 text-left font-semibold border-b border-white/10">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-3 text-gray-300">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#11162a] border border-white/10 px-5 py-4 rounded-2xl shadow-lg">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* ───────────── Input Bar ───────────── */}
      <footer className="border-t border-white/10 bg-[#0f1525] px-4 py-4">
        <div className="max-w-5xl mx-auto flex gap-3">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ask Library AI..."
            className="flex-1 resize-none rounded-xl bg-[#11162a] border border-white/10 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={sendQuery}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 font-medium hover:bg-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </footer>

    </div>
  );
};

export default LibraryAssistant;
