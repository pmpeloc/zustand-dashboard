import { StateCreator, create } from 'zustand';
import type { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  getTasksByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  tasksCount: () => number;
}

const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  draggingTaskId: undefined,
  tasks: {
    'abc-1': { id: 'abc-1', title: 'Task 1', status: 'open' },
    'abc-2': { id: 'abc-2', title: 'Task 2', status: 'in-progress' },
    'abc-3': { id: 'abc-3', title: 'Task 3', status: 'done' },
    'abc-4': { id: 'abc-4', title: 'Task 4', status: 'open' },
  },
  getTasksByStatus: (status: TaskStatus) =>
    Object.values(get().tasks).filter((task) => task.status === status),
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },
  setDraggingTaskId: (draggingTaskId: string) => {
    set({ draggingTaskId });
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // const task = get().tasks[taskId];
    // task.status = status;

    set((state) => {
      state.tasks[taskId] = { ...state.tasks[taskId], status };
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;

    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
  tasksCount: () => Object.keys(get().tasks).length,
});

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: 'task-store' }))
);
