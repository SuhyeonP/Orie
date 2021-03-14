import React from 'react';
import { Meta, Story } from '@storybook/react';
import Image, { ImageProps } from './Image';
import { DarkTheme, LightTheme, ThemeProvider } from '../Theme';

export default {
  title: 'Components/General/Image',
  component: Image,
  argTypes: {
    onClick: { action: 'clicked' },
    src: { control: { type: 'text' } },
    theme: {
      control: {
        type: 'select',
        options: [
          'Light',
          'Dark',
        ],
      },
      defaultValue: 'Light',
    },
  },
} as Meta;

interface ImageStoryProps extends ImageProps{
  theme:string;
}

const Template: Story<ImageStoryProps> = (args) => {
  const { theme, ...imageArgs } = args;
  return (
    <ThemeProvider theme={theme === 'Light' ? LightTheme : DarkTheme}>
      <Image {...imageArgs} />
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.displayName = 'test image';
Primary.args = {
  width: 100,
  height: 100,
  rounded: true,
  roundSize: 2,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ratio: true,
  ratioRate: '16/9',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  ratio: true,
  ratioRate: '7/6',
  rounded: true,
  roundSize: 20,
};

export const Alt = Template.bind({});
Alt.args = {
  alt: 'change alt',

};
