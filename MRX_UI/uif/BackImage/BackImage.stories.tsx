import React from 'react';
import { Meta, Story } from '@storybook/react';
import BackImage, { BackImageProps } from './BackImage';
import { DarkTheme, LightTheme, ThemeProvider } from '../Theme';

export default {
  title: 'Components/General/BackImage',
  component: BackImage,
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

interface BackImageStoryProps extends BackImageProps{
  theme:string;
}

const Template: Story<BackImageStoryProps> = (args) => {
  const { theme, ...backImageArgs } = args;
  return (
    <ThemeProvider theme={theme === 'Light' ? LightTheme : DarkTheme}>
      <BackImage {...backImageArgs} />
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.displayName = 'test image';
Primary.args = {
  width: 100,
  height: 100,
  repeat: 'space',
  size: 'middle',
  imageWidth: 100,
  imageHeight: 100,
  opacity: 0.1,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  width: 100,
  height: 100,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  width: 100,
  height: 100,
};
