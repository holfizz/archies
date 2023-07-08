import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TaskSliceProps {
    title: string;
    description: string;
    status: string;
}

export interface TaskState {
    tasks: TaskSliceProps[];
}

const initialState: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskSliceProps>) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action: PayloadAction<TaskSliceProps>) => {
            state.tasks = state.tasks.filter(task => task.title !== action.payload.title);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        setTasks: (state, action: PayloadAction<TaskSliceProps[]>) => {
            state.tasks = action.payload;
            console.log('New tasks:', state.tasks); // Add console log here
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const {addTask, deleteTask, setTasks} = taskSlice.actions;

export default taskSlice.reducer;