import {combineReducers} from '@reduxjs/toolkit';
import taskReducer, {TaskState} from './taskSlice';

export interface RootState {
    task: TaskState;
}

export const rootReducer = combineReducers<RootState>({
    task: taskReducer,
});

