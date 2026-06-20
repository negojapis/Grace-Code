"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { JetBrains_Mono } from "next/font/google"

const codeFont = JetBrains_Mono({ weight: ['400', '700'], subsets: ['latin'] })

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

const TypingTitle = () => {
  const phrases = [
    'Olá, eu sou a Laura',
    'Desenvolvedora Full Stack especializada em transformar ideias em soluções digitais',
    'Como posso ajudar?'
  ];
  
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = phrases[currentStringIndex];

    const handleType = () => {
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }
    };

    if (!isDeleting && currentText === fullText) {
      // Wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      // Move to next string
      setIsDeleting(false);
      setCurrentStringIndex((prev) => (prev + 1) % phrases.length);
      timeout = setTimeout(() => {}, 200);
    } else {
      // Typing speed
      const delay = isDeleting ? 30 : 80;
      timeout = setTimeout(handleType, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStringIndex]);

  return (
    <div className="flex justify-center w-full items-center min-h-[120px]">
      <h1 
        className={`text-white text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-widest text-center leading-relaxed max-w-5xl mx-auto ${codeFont.className}`}
        style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
      >
        {currentText}
        <span className="inline-block w-[5px] h-[0.9em] bg-white ml-2 -mb-[4px] animate-pulse"></span>
      </h1>
    </div>
  )
}

const RainingLetters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const charCount = 300
    const newCharacters: Character[] = []

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      })
    }

    return newCharacters
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>()
      const numActive = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(newActiveIndices)
    }

    const flickerInterval = setInterval(updateActiveIndices, 50)
    return () => clearInterval(flickerInterval)
  }, [characters.length])

  useEffect(() => {
    let animationFrameId: number

    const updatePositions = () => {
      setCharacters(prevChars =>
        prevChars.map(char => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
            ],
          }),
        }))
      )
      animationFrameId = requestAnimationFrame(updatePositions)
    }

    animationFrameId = requestAnimationFrame(updatePositions)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <TypingTitle />
      </div>

      {/* Raining Characters */}
      {characters.map((char, index) => (
        <span
          key={index}
          className={`absolute text-xs transition-colors duration-100 ${
            activeIndices.has(index)
              ? "text-[#FF5B00] text-base scale-125 z-10 font-bold animate-pulse"
              : "text-[#A8A8A8] font-light"
          }`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            textShadow: activeIndices.has(index)
              ? '0 0 8px rgba(255,122,0,0.8), 0 0 12px rgba(255,122,0,0.4)'
              : 'none',
            opacity: activeIndices.has(index) ? 1 : 0.4,
            transition: 'color 0.1s, transform 0.1s, text-shadow 0.1s',
          }}
        >
          {char.char}
        </span>
      ))}
    </div>
  )
}

export default RainingLetters
