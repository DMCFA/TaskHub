import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Project {
  project_id: number;
  name: string;
  description?: string;
  start_date: Date;
  end_date?: Date | null;
  project_manager: number;
  team_id: number;
  created_on: Date;
  updated_on: Date;
}

export interface ProjectState {
  projects: Project[] | null;
}

const initialState: ProjectState = {
  projects: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      if (state.projects) state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      if (state.projects) {
        const index = state.projects.findIndex(
          (project) => project.project_id === action.payload.project_id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      }
    },
    removeProject: (state, action: PayloadAction<number>) => {
      if (state.projects) {
        const index = state.projects.findIndex(
          (project) => project.project_id === action.payload
        );
        if (index !== -1) {
          state.projects.splice(index, 1);
        }
      }
    },
  },
});

export const { setProjects, addProject, updateProject, removeProject } =
  projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;