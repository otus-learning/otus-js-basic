import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HLev } from "../script/hLev/hLev";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "H",
  component: HLev,
} as ComponentMeta<typeof HLev>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HLev> = (args) => (
  <HLev level={args.level} text={args.text} color={args.color} key={""} />
);

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  text: "text",
  color: "black",
  level: 6,
};

export const Big = Template.bind({});
Big.args = {
  text: "text",
  color: "black",
  level: 1,
};

export const Blue = Template.bind({});
Blue.args = {
  text: "text",
  color: "blue",
  level: 1,
};

export const Red = Template.bind({});
Red.args = {
  text: "text",
  color: "red",
  level: 1,
};
