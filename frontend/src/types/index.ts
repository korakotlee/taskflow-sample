export interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id?: number;
  assignee?: User;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Comment {
  id: number;
  task_id: number;
  user_id: number;
  user: User;
  body: string;
  created_at: string;
}

// API response types
export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
