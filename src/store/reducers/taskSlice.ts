import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TaskSliceProps {
    id: string
    title: string;
    description: string;
    status: string;
    order: number
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

const storedState = localStorage.getItem('boards' || '');
const initialState: TaskBoardState = storedState ? {boards: [...JSON.parse(storedState)]} : {
    boards: [
        {
            id: "1",
            name: "todo",
            items: []
        },
        {
            id: "2",
            name: "progress",
            items: []
        },
        {
            id: "3",
            name: "review",
            items: []
        },
        {
            id: "4",
            name: "done",
            items: []
        }
    ],
}
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ boardId: string, task: TaskSliceProps }>) => {
            const board = state.boards.find(board => board.name === action.payload.boardId);
            if (board) {
                board.items.push(action.payload.task);
                localStorage.setItem('boards', JSON.stringify(state.boards));
            }
        },
        deleteTask: (state, action: PayloadAction<{ boardId: string, taskId: string }>) => {
            const board = state.boards.find((board: BoardSliceProps) => board.name === action.payload.boardId);
            if (board) {
                board.items = board.items.filter((task: TaskSliceProps) => task.id !== action.payload.taskId);
                console.log(board.items)
                localStorage.setItem('boards', JSON.stringify(state.boards));
            }
        },
        setTasks: (state, action: PayloadAction<{ boardId: string, tasks: TaskSliceProps[] }>) => {
            const board = state.boards.find(board => board.id === action.payload.boardId);
            if (board) {
                board.items = action.payload.tasks;
                localStorage.setItem('boards', JSON.stringify(state.boards));
            }
        },
    },
});

export const {addTask, deleteTask, setTasks} = taskSlice.actions;

export default taskSlice.reducer;