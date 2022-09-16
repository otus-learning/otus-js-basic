import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { P } from "../script/p/p";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "P",
  component: P,
} as ComponentMeta<typeof P>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof P> = (args) => (
  <P text={args.text} color={args.color} key={""} />
);

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  text: "text",
  color: "black",
};

export const Capital = Template.bind({});
Capital.args = {
  text: "TEXT",
  color: "black",
};

export const Blue = Template.bind({});
Blue.args = {
  text: "text",
  color: "blue",
};

export const Red = Template.bind({});
Red.args = {
  text: "text",
  color: "red",
};
