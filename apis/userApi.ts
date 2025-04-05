import { auth } from '../lib/firebase';
import { User, UserDataForm } from './user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const getAuthToken = async (): Promise<string | null> => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      return await currentUser.getIdToken();
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  }
  console.log("No current user found for getting token.");
  return null;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, {
    ...options,
    headers,
  });
};


export const fetchUserDataApi = async (): Promise<User | undefined> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/fetch-user-data`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch user data' }));
  } else {

    return await response.json()
  }
}

export const updateUserDataApi = async (userData: UserDataForm): Promise<{ message: string } | undefined> => {
  console.log(userData)
  const response = await fetchWithAuth(`${API_BASE_URL}/user/update-user-data`, {
    method: 'POST',
    body: JSON.stringify(userData)
  });

  return await response.json()
}