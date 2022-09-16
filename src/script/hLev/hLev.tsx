import React, { useState } from "react";

type HLevProps = {
  level: number;
  text: string;
  color: string;
  key: string;
};

type HTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const HLev: React.FC<HLevProps> = ({ level, text, color }) => {
  (level < 1 || level > 6) && (level = 6);
  const Tag = `h${level}` as HTag;
  return <Tag style={{ color }}>{text}</Tag>;
};
