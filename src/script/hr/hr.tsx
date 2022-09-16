import React, { useState } from "react";

type HrProps = {
  before: string;
  after: string;
  key: string;
};

export const Hr: React.FC<HrProps> = ({ before, after }) => {
  let cnt = Number(before);
  let beforeStr = "";
  for (let i = 0; i < (isNaN(cnt) ? 0 : cnt); i++) {
    beforeStr += "\n";
  }

  cnt = Number(after);
  let afterStr = "";
  for (let i = 0; i < (isNaN(cnt) ? 0 : cnt); i++) {
    afterStr += "\n";
  }
  return (
    <>
      <pre>{beforeStr}</pre>
      <hr />
      <pre>{afterStr}</pre>
    </>
  );
};
