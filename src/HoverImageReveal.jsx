import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const items = [
  {
    text: "KIM   GAYOUNG",
    image: {
      src: "https://cdn.imagetourls.com/uploads/tyImg/G3GedSyR.jpg",
    },
  },
  {
    text: "BAE   SEOJIN",
    image: {
      src: "https://cdn.imagetourls.com/uploads/tyImg/7LvPLTQN.jpg",
    },
  },
  {
    text: "LEE   SUNJU",
    image: {
      src: "https://cdn.imagetourls.com/uploads/tyImg/ZVsB4qoo.jpg",
    },
  },
  {
    text: "CHOI   HYERI",
    image: {
      src: "https://cdn.imagetourls.com/uploads/tyImg/108gFHfQI.jpg",
    },
  },
];

export default function HoverImageReveal() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 400,
    damping: 40,
    mass: 1,
  });

  const springY = useSpring(mouseY, {
    stiffness: 400,
    damping: 40,
    mass: 1,
  });

  const handleMouseMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(event.clientX - rect.left - 400);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#ffffff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "60px",
        boxSizing: "border-box",
        fontFamily: "'Bebas Neue', sans-serif",
      }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }
      `}</style>

      {/* Names */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "50px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            style={{
              fontSize: "70px",
              lineHeight: "1.3em",
              letterSpacing: "0.5em",
              fontWeight: 200,
              color:
                activeIndex === null || activeIndex === index
                  ? "#5F3122"
                  : "#8630305C",
              cursor: "pointer",
              textAlign: "right",
              whiteSpace: "nowrap",
              transition: "color 0.3s ease",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Floating image */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              x: springX,
              y: springY,
              width: "300px",
              height: "400px",
              borderRadius: "15px",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 10,
            }}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <motion.img
              key={items[activeIndex].image.src}
              src={items[activeIndex].image.src}
              alt={items[activeIndex].text}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              transition={{
                duration: 0.3,
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
