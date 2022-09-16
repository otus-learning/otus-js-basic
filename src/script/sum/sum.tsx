import React, { useState } from "react";

type SumProps = {
  hdr: string;
  text: string;
  key: string;
  color: string;
};

export const Summary: React.FC<SumProps> = ({ hdr, text, color }) => {
  return (
    <>
      <details style={{ color }}>
        <summary style={{ color }}>{hdr}</summary>
        {text}
      </details>
    </>
  );
};
