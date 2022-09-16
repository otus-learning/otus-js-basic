import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Hr } from "../script/hr/hr";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hr",
  component: Hr,
} as ComponentMeta<typeof Hr>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Hr> = (args) => (
  <Hr before={args.before} after={args.after} key={""} />
);

export const Visualization = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Visualization.args = {
  before: "1",
  after: "1",
};
