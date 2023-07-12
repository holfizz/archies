import {combineReducers} from "redux";
import taskReducer, {TaskBoardState} from "./taskSlice";

export interface rootState {
    boards: TaskBoardState;
}

export const rootReducer = combineReducers<rootState>({
    boards: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>