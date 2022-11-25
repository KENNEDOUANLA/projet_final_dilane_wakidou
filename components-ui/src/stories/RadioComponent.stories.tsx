import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {RadioComponent} from "../components";

import "../scss/Botton.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI/RadioComponent",
  component: RadioComponent,
} as ComponentMeta<typeof RadioComponent>;

export const CheckboxComponentView: ComponentStory<typeof RadioComponent> = (
  args
) =>{
  return (
    <div>
      <RadioComponent {...args} label="Connexion admin">Button</RadioComponent>
      <RadioComponent {...args} label="Connexion admin">Button</RadioComponent>
    </div>
  )
} ;
