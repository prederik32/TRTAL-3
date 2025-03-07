import { useState, useEffect } from 'react';
import { Button } from "./components/Button";
import { Card, CardContent } from "./components/Card";
import { motion } from "framer-motion";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  const handleBet = (eventId, option) => {
    fetch('/api/bet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, user: "testUser", option, amount: 100 })
    })
    .then(res => res.json())
    .then(data => console.log("Bet placed:", data))
    .catch(err => console.error("Error placing bet:", err));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h1 className="text-3xl font-bold mb-4" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        대한민국 정치 베팅 사이트
      </motion.h1>
      <p className="mb-6 text-gray-500">현재 진행 중인 정치 이벤트에 베팅하세요!</p>
      
      <div className="grid gap-4">
        {events.map(event => (
          <Card key={event.id} className="p-4 border">
            <CardContent>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <div className="flex gap-2 mt-2">
                {event.options.map(option => (
                  <Button key={option} variant="outline" onClick={() => handleBet(event.id, option)}>
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <Button variant="default">로그인 / 회원가입</Button>
      </div>
    </div>
  );
}

// package.json 추가 내용
export const packageJson = {
  "name": "political-betting-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "framer-motion": "latest"
  }
};
