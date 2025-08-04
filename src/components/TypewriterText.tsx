import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number; // typing speed in milliseconds
  cursorBlinkSpeed?: number; // cursor blink interval in milliseconds
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text = "",
  speed = 100,
  cursorBlinkSpeed = 500,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        const char = text.charAt(index);
        setDisplayedText((prev) => prev + char);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: "monospace", whiteSpace: "pre" }}
    >
      {displayedText}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </motion.div>
  );
};

export default TypewriterText;
