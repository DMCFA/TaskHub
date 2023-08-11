import { useQuery } from '@tanstack/react-query';
import { User } from '../../../services/features/userSlice';

const baseUrl = 'http://localhost:3001/api/teams/';

export interface Team {
  team_id: number;
  name: string;
  description: string;
  created_on: Date;
  updated_on: Date;
  users?: User[];
}

export const fetchTeamById = async (teamId: number) => {
  try {
    const res = await fetch(`${baseUrl}${teamId}`);
    if (!res.ok) {
      throw new Error('Error fetching team');
    }
    const data = await res.json();
    return data.team;
  } catch (error) {
    console.error('Error getting team', error);
  }
};

export const useTeamById = (teamId: number) => {
  return useQuery(['team', teamId], () => fetchTeamById(teamId));
};
