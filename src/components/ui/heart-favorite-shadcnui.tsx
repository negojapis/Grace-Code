"use client"

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

export function HeartFavorite() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex items-center justify-center p-4">
      <motion.button
        onClick={() => setIsLiked(!isLiked)}
        whileTap={{ scale: 0.9 }}
        className="rounded-full p-4 transition-colors hover:bg-white/10"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Heart
            className={`h-12 w-12 transition-colors duration-500 ${
              isLiked ? "fill-[#FF5B00] text-[#FF5B00]" : "text-white opacity-80"
            }`}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
