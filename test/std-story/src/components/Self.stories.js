import React from 'react';

import Self from './Self';

export default {
    component: Self,
    title: 'Self',
};

const Template = args => <Self {...args} />;

export const Default = Template.bind({});
Default.args = {
    task: {
        underline:true,
    },
};

export const ChangeColor = Template.bind({});
ChangeColor.args = {
    task: {
        ...Default.args.task,
        color:'green'
    },
};

export const ResetBefore = Template.bind({});
ResetBefore.args = {
    task: {
        ...Default.args.task,
        italic:true,
        underline:false
    },
};
