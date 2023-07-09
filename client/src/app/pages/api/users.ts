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
