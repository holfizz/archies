import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

export interface TaskSliceProps {
    id: string
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
        addTask: (state, action: PayloadAction<Omit<TaskSliceProps, 'id'>>) => {
            const newTask = {
                id: uuidv4().toString(),
                ...action.payload,
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action: PayloadAction<{ id: string }>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        setTasks: (state, action: PayloadAction<TaskSliceProps[]>) => {
            state.tasks = action.payload;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const {addTask, deleteTask, setTasks} = taskSlice.actions;

export default taskSlice.reducer;