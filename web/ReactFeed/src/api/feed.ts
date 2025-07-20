import api from './axios';

export const getPosts = async (token: string, page: number, limit: number = 10) => {
  const response = await api.get('/api/posts', {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });
  return response.data;
};
