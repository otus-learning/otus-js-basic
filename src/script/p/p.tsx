import React, { useState } from "react";

type PProps = {
  text: string;
  key: string;
  color: string;
};

export const P: React.FC<PProps> = ({ text, color }) => {
  return <p style={{ color }}>{text}</p>;
};
