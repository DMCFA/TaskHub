import { shuffleArray } from '../../../lib/utilFunctions';
import { Project } from '../../../services/features/projectSlice';

const baseUrl = 'http://localhost:3001/api/projects';
const headers = { 'Content-Type': 'application/json' };

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(baseUrl);

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data: Project[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching random projects:', error);
    return [];
  }
};

export const getRandomProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(baseUrl);

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data: Project[] = await res.json();
    return shuffleArray(data).slice(0, 8);
  } catch (error) {
    console.error('Error fetching random projects:', error);
    return [];
  }
};
