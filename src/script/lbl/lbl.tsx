import React, { useState } from "react";

type LblProps = {
  text: string;
};

export const Lbl: React.FC<LblProps> = ({ text }) => {
  return (
    <>
      <label>{text}</label>
      <br />
    </>
  );
};
