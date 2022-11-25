import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {ButtonComponent} from "../components";

import "../scss/Botton.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI/ButtonComponent",
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

export const CheckboxComponentView: ComponentStory<typeof ButtonComponent> = (
  args
) =><ButtonComponent {...args} value="Connexion admin">Button</ButtonComponent>;
