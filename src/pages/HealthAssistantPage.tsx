import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, AlertTriangle } from "lucide-react";

type Message = { sender: "user" | "assistant"; text: string };

const quickTopics = ["Fever", "Headache", "Cold", "Healthy habits", "When to see a doctor"];

export const HealthAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.lang = "en-US";
      recognizer.interimResults = false;
      recognizer.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        handleSend(transcript);
      };
      recognizer.onend = () => setListening(false);
      recognitionRef.current = recognizer;
    }
  }, []);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setListening(false);
  };

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (listening) {
        stopListening();
      } else {
        stopSpeaking();
        setListening(true);
        recognitionRef.current.start();
      }
    }
  };

  const mockAssistantResponse = (userText: string) => {
    let response = "I’m here to provide general health information. ";
    if (/fever/i.test(userText)) {
      response += "Fever is usually a sign of infection. Stay hydrated and rest. If it persists, consult a doctor.";
    } else if (/headache/i.test(userText)) {
      response += "Headaches can be caused by stress, dehydration, or eye strain. Consider taking a break and drinking water.";
    } else if (/cold/i.test(userText)) {
      response += "Common colds are viral. Rest, fluids, and over‑the‑counter remedies can help ease symptoms.";
    } else if (/healthy habits/i.test(userText)) {
      response += "Regular exercise, balanced diet, and adequate sleep are key to good health.";
    } else if (/doctor/i.test(userText)) {
      response += "If symptoms are severe or worsening, it’s best to seek professional medical advice.";
    } else {
      response += "Feel free to ask about symptoms, wellness tips, or general health topics.";
    }
    return response;
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply = mockAssistantResponse(text);
      const assistantMsg: Message = { sender: "assistant", text: reply };
      setMessages(prev => [...prev, assistantMsg]);
      speak(reply);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-lavender-light text-purple-deep p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Health Assistant</h1>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {quickTopics.map(topic => (
          <button key={topic} className="px-3 py-1 bg-purple-deep text-white rounded hover:bg-purple-800 transition" onClick={() => handleSend(topic)}>{topic}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto mb-4 p-2 border border-purple-300 rounded bg-white">
        {messages.map((msg, i) => (
          <div key={i} className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-purple-deep text-white" : "bg-gray-200 text-gray-800"}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Listening / Speaking Status Indicators with Stop button */}
      {(listening || speaking) && (
        <div className="flex flex-col gap-2 mb-3 max-w-xl mx-auto w-full">
          {listening && (
            <div className="flex items-center justify-between bg-red-50 border border-red-200 p-2.5 rounded-lg text-red-700 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                🎙️ Listening to your voice...
              </span>
              <button 
                onClick={stopListening}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition"
              >
                Stop Listening
              </button>
            </div>
          )}
          {speaking && (
            <div className="flex items-center justify-between bg-purple-50 border border-purple-200 p-2.5 rounded-lg text-purple-deep text-sm">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-deep animate-pulse"></span>
                🔊 Assistant is speaking...
              </span>
              <button 
                onClick={stopSpeaking}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition"
              >
                Stop
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input type="text" className="flex-1 border border-purple-300 rounded px-3 py-2 focus:outline-none" placeholder="Type your question..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend(input)} />
        <button aria-label="Send" className="p-2 bg-purple-deep text-white rounded hover:bg-purple-800" onClick={() => handleSend(input)}><Send size={20} /></button>
        {recognitionRef.current && (
          <button aria-label="Voice input" className={`p-2 rounded ${listening ? "bg-red-600 hover:bg-red-700" : "bg-purple-deep hover:bg-purple-800"} text-white`} onClick={toggleListening}><Mic size={20} /></button>
        )}
      </div>
      <div className="mt-4 text-sm text-center">
        <p className="italic mb-2">Nexora Health provides general health information and does not diagnose or replace professional medical advice.</p>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Request Professional Help</button>
      </div>
    </div>
  );
};
export default HealthAssistantPage;
