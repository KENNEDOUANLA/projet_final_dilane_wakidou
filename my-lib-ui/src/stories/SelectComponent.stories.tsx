import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {SelectComponent} from "../components";

import "../index.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI/SelectComponent",
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

export const CheckboxComponentView: ComponentStory<typeof SelectComponent> = (
  args
) =><SelectComponent {...args} label="Nationalité" data={[{label:"test1"},{label:"test2"}]} ></SelectComponent>;
