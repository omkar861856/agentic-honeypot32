"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  RefreshCcw, 
  ShieldCheck, 
  Terminal, 
  History, 
  ArrowRight,
  ChevronRight,
  Code
} from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

interface Message {
  sender: "scammer" | "user";
  text: string;
  timestamp: string;
}

interface HackathonRequest {
  sessionId: string;
  message: Message;
  conversationHistory: Message[];
  metadata: {
    channel: string;
    language: string;
    locale: string;
  };
}

export default function HackathonTester() {
  const [sessionId, setSessionId] = useState("");
  const [apiKey, setApiKey] = useState("secret-hackathon-key-2026");
  const [currentMessage, setCurrentMessage] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [rawRequest, setRawRequest] = useState<HackathonRequest | null>(null);

  useEffect(() => {
    setSessionId(`session-${uuidv4().slice(0, 8)}`);
  }, []);

  const handleSend = async () => {
    if (!currentMessage.trim()) return;

    setIsLoading(true);
    const newMessage: Message = {
      sender: "scammer",
      text: currentMessage,
      timestamp: new Date().toISOString(),
    };

    const requestBody: HackathonRequest = {
      sessionId,
      message: newMessage,
      conversationHistory: history,
      metadata: {
        channel: "SMS",
        language: "English",
        locale: "IN",
      },
    };

    setRawRequest(requestBody);

    try {
      const startTime = performance.now();
      const response = await fetch("/api/honeypot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const endTime = performance.now();
      
      setLastResponse({
        ...data,
        responseTime: Math.round(endTime - startTime),
        status: response.status
      });

      if (data.status === "success") {
        setHistory([...history, newMessage, {
          sender: "user",
          text: data.reply,
          timestamp: new Date().toISOString()
        }]);
        setCurrentMessage("");
      }
    } catch (error) {
      console.error("Test failed", error);
      setLastResponse({ status: "error", message: "Network error" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    setSessionId(`session-${uuidv4().slice(0, 8)}`);
    setHistory([]);
    setLastResponse(null);
    setRawRequest(null);
    setCurrentMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Hackathon API Tester
              </h1>
            </div>
            <p className="text-slate-500 dark:text-zinc-400">
              Simulate Hackathon evaluation flows for the Agentic Honey-Pot.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">Back to Chat</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={resetSession} className="text-slate-500">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset Session
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & History */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-900 overflow-hidden">
              <CardHeader className="bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  Request Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Session ID</label>
                    <Input 
                      value={sessionId} 
                      onChange={(e) => setSessionId(e.target.value)}
                      className="bg-slate-50 dark:bg-zinc-800 border-none font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">X-API-KEY</label>
                    <Input 
                      type="password"
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-slate-50 dark:bg-zinc-800 border-none font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Incoming Scammer Message</label>
                  <div className="relative">
                    <textarea 
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="e.g. Your bank account is blocked. Verify at..."
                      className="w-full h-32 p-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-700 dark:text-zinc-200"
                    />
                    <Button 
                      onClick={handleSend}
                      disabled={isLoading || !currentMessage.trim()}
                      className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-lg shadow-indigo-500/20"
                    >
                      {isLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                      {isLoading ? "Analyzing..." : "Send Request"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-900">
              <CardHeader className="border-b border-slate-100 dark:border-zinc-800">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-500" />
                  Conversation Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-6">
                  {history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 opacity-20" />
                      </div>
                      <p>No messages yet. Start a conversation above.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {history.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.sender === "scammer" ? "items-end" : "items-start"}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{msg.sender}</span>
                            <span className="text-[10px] text-slate-300">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <div className={`max-w-[85%] p-4 rounded-2xl ${
                            msg.sender === "scammer" 
                              ? "bg-slate-100 dark:bg-zinc-800 dark:text-zinc-300 rounded-tr-none" 
                              : "bg-indigo-600 text-white rounded-tl-none shadow-md"
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: JSON & Response */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-slate-900 text-zinc-300 border-none shadow-xl overflow-hidden font-mono text-[13px]">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <span className="flex items-center gap-2"><Code className="w-4 h-4 text-emerald-400" /> HTTP Request</span>
                <Badge variant="outline" className="border-slate-600 text-slate-400">POST /api/honeypot</Badge>
              </div>
              <CardContent className="p-4 overflow-x-auto">
                {rawRequest ? (
                  <pre className="text-emerald-400 w-full overflow-hidden">
                    {JSON.stringify(rawRequest, null, 2)}
                  </pre>
                ) : (
                  <p className="text-slate-600 italic">Send a message to see the request body...</p>
                )}
              </CardContent>
            </Card>

            <Card className={`border-none shadow-xl dark:bg-zinc-900 transition-all ${lastResponse?.status === "success" ? "ring-2 ring-emerald-500/50" : ""}`}>
              <CardHeader className="border-b border-slate-100 dark:border-zinc-800">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-500" />
                    Latest Response
                  </div>
                  {lastResponse && (
                    <Badge className={lastResponse.status === 200 ? "bg-emerald-500" : "bg-rose-500"}>
                      {lastResponse.status} OK
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {lastResponse ? (
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-800">
                       <p className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">API Output</p>
                       <pre className="text-sm text-indigo-600 dark:text-indigo-400 font-mono whitespace-pre-wrap">
                         {JSON.stringify(lastResponse, null, 2)}
                       </pre>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                      <span>Latency: {lastResponse.responseTime}ms</span>
                      <span>Auth: x-api-key provided</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 flex flex-col items-center justify-center text-slate-400 italic">
                    <p>Awaiting response...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
