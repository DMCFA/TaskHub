import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { Dispatch } from '@reduxjs/toolkit';
import { loginSuccess } from '../../../services/features/userSlice';
import { Project, setProjects } from '../../../services/features/projectSlice';

const baseUrl = 'http://localhost:3001/api/users';
const headers = { 'Content-Type': 'application/json' };

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (res.ok) {
      const { user } = await res.json();
      return user;
    } else {
      const { error } = await res.json();
      return error;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const registerUser = async (data: {
  username: string;
  fname: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (res.ok) {
      const { newUser: user } = await res.json();
      return user;
    } else {
      throw new Error('Failed to register user');
    }
  } catch (error) {
    console.error('Error', error);
  }
};

export async function autoLogin(dispatch: Dispatch, router: AppRouterInstance) {
  try {
    const response = await fetch(`${baseUrl}/newuser-auth`, {
      method: 'POST',
      credentials: 'include',
    });
    if (response.status === 200) {
      const userResponse = await response.json();
      const user = userResponse.user;
      dispatch(loginSuccess(user));
      router.push('/dashboard');
    } else {
      console.error('Auto-login failed:', response.status);
    }
  } catch (error) {
    console.error('Auto-login failed:', error);
  }
}

export async function logout(router: AppRouterInstance) {
  try {
    const response = await fetch(`${baseUrl}/logout`, {
      method: 'POST',
    });
    if (response.status === 200) {
      router.push('/');
    } else {
      console.error('Logout failed:', response.status);
    }
  } catch (error) {
    console.error('Error trying to logout', error);
  }
}

export async function getUserProjects(userId: number): Promise<Project[]> {
  try {
    const res = await fetch(`${baseUrl}/projects/${userId}`);
    if (res.status === 200) {
      const projects = await res.json();
      return projects;
    } else {
      console.error('Failed to get user projects:', res.status);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export function getProjectsForUser(userId: number) {
  return async (dispatch: Dispatch) => {
    try {
      const projects = await getUserProjects(userId);
      dispatch(setProjects(projects));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };
}
