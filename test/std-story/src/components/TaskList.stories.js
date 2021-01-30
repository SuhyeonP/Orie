import React from 'react';

import TaskList from "./TaskList";
import * as TaskStories from './Task.stories';
//TaskStories를 가져옴으로써 최소한의 노력으로 스토리속의 인수 (arguments 줄임말로 args)를 합성(compose)할수있다.
//이를통해 두 컴포넌트가 받을수 있는 데이터와 액션(mocked callbacks)이 모두 보존된다.
export default {
    component:TaskList,
    title:'TaskList',
    decorators:[story=><div style={{padding:'3rem'}}>{story()}</div>],
}

const Template=args=><TaskList {...args}/>

export const Default = Template.bind({});
Default.args = {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in task.stories.js.
    tasks: [
        { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
        { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
        { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
        { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
        { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
        { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Default story.
    tasks: [
        ...Default.args.tasks.slice(0, 5),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    tasks: [],
    loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
};

//storyshot을 통한 스냅샷테스트 하는 방법이였음.