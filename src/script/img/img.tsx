import React, { useState } from "react";

type ImgProps = {
  src: string;
  text: string;
  key: string;
};

export const Img: React.FC<ImgProps> = ({ src, text }) => {
  return <img src={src} alt={text} />;
};
