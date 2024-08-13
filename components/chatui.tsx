"use client";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";

// Constants
const questions = [
  "Why is Uzbekistan famous?",
  "Why visit Uzbekistan landmarks",
  "What are 5 facts about Uzbekistan?"
];

// Component Function
export function ChatUI() {
  // State and Refs
  const { messages, input, handleInputChange, handleSubmit, setMessages, setInput, isLoading } = useChat();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Effect Hooks
  useEffect(() => {
    fetchLastUpdated();
  }, []);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [setMessages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (messages.length) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Event Handlers and Helper Functions
  const fetchLastUpdated = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/asadbeksr/travel-ai');
      const data = await response.json();
      setLastUpdated(new Date(data.updated_at).toLocaleDateString());
    } catch (error) {
      console.error('Error fetching last updated date:', error);
    }
  };

  const generateAnswer = (message: string) => {
    if (isLoading) return;
    setInput(message);
    // Trigger submit button click after setting input
  
    if (submitButton.current) {
      submitButton.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
      <Card
        ref={chatRef}
        className="border-green-400 w-full max-w-xl max-h-[75vh] min-h-[75vh]  sm:max-h-[75vh] sm:min-h-[75vh] overflow-scroll no-scrollbar px-4 bg-white rounded-lg">
        <CardHeader className="p-0 sticky top-0 bg-white bg-opacity-50 backdrop-blur-sm z-[99] py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SparkleIcon className="w-6 h-6 text-green-500" />
              <h1 className="ml-2 text-lg font-medium">Travel Assistant</h1>
            </div>
          </div>
        </CardHeader>

        <div className="flex flex-col items-center justify-center py-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqYMo4q48X1uBYl-Uv-iYh5OlFBtDZB81HA&s" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>

          <p className="mt-4 text-center text-gray-500">What do you want to know about Uzbekistan?</p>
        </div>

        <CardContent className="p-0 relative">
          <div className={`mt-4 items-start ${!messages.length ? `min-h-[13vh]` : `min-h-[30vh]`} `}>
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'} mt-3`}>
                {m.role !== 'user' && <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>}
                <div className={`${m.role === 'user' ? '0' : ''} ${m.role === 'user' ? '' : ''} p-2 rounded-md border`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* // FAST ACCESS BUTTONS */}
          {!messages.length && (
            <div className="flex flex-col items-end space-y-2">
              {questions.map((label, index) => (
                <Button key={index} variant="outline" onClick={() => generateAnswer(label)}>
                  {label}
                </Button>
              ))}
            </div>
          )}

          <CardFooter className="mt-4 p-0 sticky bottom-2 w-full left-0 right-0 bg-white border rounded-lg shadow-[0px_60px_197px_7px_rgba(79,_237,_23,_0.28)]" >
            <form onSubmit={handleSubmit} className="w-full">
              <Input ref={inputRef} className="border-none" placeholder="Ask me anything..." value={input} onChange={handleInputChange} />
              <div className="border-t bg-gray-200/50 rounded-b-lg flex justify-between gap-3">
                <div className="flex gap-1 overflow-scroll no-scrollbar rounded-lg">
                  {!!messages.length && <> {questions.map((label, index) => (
                <Button key={index} size='sm' variant="outline" onClick={() => generateAnswer(label)}>
                  {label}
                </Button>
              ))}</>}
                </div>

                <Button variant="ghost" size="icon" type="submit" className="mr-4" ref={submitButton}>
                  <SendIcon className="w-6 h-6 text-green-600" />
                </Button>
              </div>
            </form>

          </CardFooter>
        </CardContent>
      </Card>


      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="absolute bottom-0 right-0 left-0 mb-2 text-black">@asadbek</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-70">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/asadbeksr.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                <a href="https://github.com/asadbeksr/pantry-tracker" className="hover:underline" target="_blank" rel="noopener noreferrer">
                  @travel-ai
                </a>
              </h4>
              <p className="text-sm">
                AI Travel Assistant by <a href="https://www.asadbek.me" className="text-primary" target="_blank" rel="noopener noreferrer">asadbek</a>
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Last updated: {lastUpdated || 'Loading...'}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

    </div>
  )
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

