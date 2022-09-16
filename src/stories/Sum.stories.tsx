import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Summary } from "../script/sum/sum";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Summary",
  component: Summary,
} as ComponentMeta<typeof Summary>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Summary> = (args) => (
  <Summary hdr={args.hdr} text={args.text} color={args.color} key={""} />
);

export const Black = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Black.args = {
  hdr: "Showed text",
  text: "Hidden text",
  color: "black",
};

export const Blue = Template.bind({});
Blue.args = {
  hdr: "Showed text",
  text: "Hidden text",
  color: "blue",
};

export const Red = Template.bind({});
Red.args = {
  hdr: "Showed text",
  text: "Hidden text",
  color: "red",
};

export const Green = Template.bind({});
Green.args = {
  hdr: "Showed text",
  text: "Hidden text",
  color: "green",
};
