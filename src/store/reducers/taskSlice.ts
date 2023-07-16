import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface list {
    id: number
    title: string
}

export interface TaskSliceProps {
    id: string
    title: string;
    description: string;
    status: string;
    order: number
    list?: list[]
}

export interface TaskState {
    tasks: TaskSliceProps[];
}

export interface BoardSliceProps {
    id: string;
    name: string;
    items: TaskSliceProps[];
}

export interface TaskBoardState {
    boards: BoardSliceProps[];
}

const storedState = localStorage.getItem('boards');
const defaultState = [
    {
        id: '1',
        name: 'todo',
        items: [],
    },
    {
        id: '2',
        name: 'progress',
        items: [],
    },
    {
        id: '3',
        name: 'review',
        items: [],
    },
    {
        id: '4',
        name: 'done',
        items: [],
    },
];
const initialState: TaskBoardState = storedState ? {boards: JSON.parse(storedState)} : {boards: defaultState};
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (
            state,
            action: PayloadAction<{ boardId: number; task: TaskSliceProps }>
        ) => {
            const board = state.boards[action.payload.boardId];
            if (board) {
                board.items.push(action.payload.task);
                localStorage.setItem('boards', JSON.stringify(state.boards));
            }
        },
        deleteTask: (
            state,
            action: PayloadAction<{ boardId: number; taskId: string }>
        ) => {
            const board = state.boards[action.payload.boardId];
            if (board) {
                board.items = board.items.filter(
                    (task: TaskSliceProps) => task.id !== action.payload.taskId
                );
                localStorage.setItem('boards', JSON.stringify(state.boards));
            }
        },
        setTasks: (state, action: PayloadAction<TaskBoardState>) => {
            state.boards = action.payload.boards;
            localStorage.setItem('boards', JSON.stringify(state.boards))
        }
    },
});

export const {addTask, deleteTask, setTasks} = taskSlice.actions;

export default taskSlice.reducer;