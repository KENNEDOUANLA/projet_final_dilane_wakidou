import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {InputComponent} from "../components";

import "../scss/Input.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI/InputComponent",
  component: InputComponent,
} as ComponentMeta<typeof InputComponent>;

export const CheckboxComponentView: ComponentStory<typeof InputComponent> = (
  args
) =><InputComponent {...args} label="Prenom" />;