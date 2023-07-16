import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from "uuid";

export interface Subtask {
    id: string;
    title: string;
    checked: boolean
}

export interface SubtaskState {
    subtasks: Subtask[];
}


export interface TaskSliceProps {
    id: string;
    title: string;
    description: string;
    status: string;
    order: number;
    list: Subtask[];
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

const storedTaskState = localStorage.getItem('boards');
const defaultTaskState: BoardSliceProps[] = [
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
const initialTaskState: TaskBoardState = storedTaskState
    ? {boards: JSON.parse(storedTaskState)}
    : {boards: defaultTaskState};

export const taskSlice = createSlice({
    name: 'task',
    initialState: initialTaskState,
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
        addSubtaskToList: (
            state,
            action: PayloadAction<{ boardId: string; taskId: string; subtaskTitle: string }>
        ) => {
            const {boardId, taskId, subtaskTitle} = action.payload;
            const board = state.boards.find((board) => board.name === boardId);
            if (board) {
                const task = board.items.find((t) => t.id === taskId);
                if (task) {
                    if (!task.list) {
                        task.list = [];
                    }
                    task.list.push({id: uuidv4(), title: subtaskTitle, checked: false});
                    localStorage.setItem('boards', JSON.stringify(state.boards));
                }
            }
        },
        deleteSubtaskFromList: (
            state,
            action: PayloadAction<{ boardId: string; taskId: string; subtaskId: string }>
        ) => {
            const {boardId, taskId, subtaskId} = action.payload;
            const board = state.boards.find((board) => board.name === boardId);

            if (board) {
                const task = board.items.find((t) => t.id === taskId);
                if (task && task.list) {
                    task.list = task.list.filter((subtask) => subtask.id !== subtaskId);
                    localStorage.setItem('boards', JSON.stringify(state.boards));
                }
            }
        },
        setTasks: (state, action: PayloadAction<TaskBoardState>) => {
            state.boards = action.payload.boards;
            localStorage.setItem('boards', JSON.stringify(state.boards))
        },
        setSubtask: (state, action: PayloadAction<{
            boardId: string;
            taskId: string;
            subtaskId: string,
            checked: boolean
        }>) => {
            const {boardId, taskId, subtaskId, checked} = action.payload;
            const board = state.boards.find((board) => board.name === boardId);
            if (board) {
                const task = board.items.find((t) => t.id === taskId);
                if (task && task.list) {
                    const subtask = task.list.find((subtask) => subtask.id === subtaskId);
                    if (subtask) {
                        subtask.checked = checked;
                        localStorage.setItem('boards', JSON.stringify(state.boards));
                    }
                }
            }
        }

    },
});

export const {addTask, deleteTask, addSubtaskToList, deleteSubtaskFromList, setTasks, setSubtask} = taskSlice.actions;

export default taskSlice.reducer;