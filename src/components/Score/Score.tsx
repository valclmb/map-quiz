"use client";

import { GameContext } from "@/src/context/GameContext";
import { useContext, useEffect, useRef } from "react";

type ScoreProps = {};

export const Score = ({}: ScoreProps) => {
  const gameContext = useContext(GameContext);

  if (!gameContext) throw new Error("Game context not defined");
  const { score, countries } = gameContext;
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scoreRef.current) {
      scoreRef.current.classList.remove("hidden");

      setTimeout(() => {
        if (scoreRef.current) {
          scoreRef.current.classList.add("hidden");
        }
      }, 1000);
    }
  }, [score]);

  useEffect(() => {});
  return (
    <div className="absolute border  border-white py-1 px-2 bottom-56 right-1/2 translate-x-1/2 rounded-md bg-background/80 backdrop-blur-md ">
      {score} / {countries.length}
      <div
        ref={scoreRef}
        className="hidden animate-ping absolute content-[''] bg-gradient-to-r from-violet-100 to-fuchsia-100 inset-0 w-50 h-50 rounded-full transition-all"
      ></div>
    </div>
  );
};
