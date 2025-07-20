export interface User {
  id: string;
  role: 'user' | 'admin';
  username: string;
  password: string;
}
