import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Img } from "../script/img/img";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Img",
  component: Img,
} as ComponentMeta<typeof Img>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Img> = (args) => (
  <Img src={args.src} text={args.text} key={""} />
);

export const Visualization = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Visualization.args = {
  src: "#PathToImageSource",
  text: "Alternative text for image",
};
