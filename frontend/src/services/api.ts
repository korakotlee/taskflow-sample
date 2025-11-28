import axios from 'axios';
import type { Project, Task } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const projectsApi = {
  getAll: () => api.get<{ projects: Project[] }>('/projects').then(r => r.data.projects),
  getOne: (id: number) => api.get<{ project: Project }>(`/projects/${id}`).then(r => r.data.project),
  create: (data: Partial<Project>) => api.post<{ project: Project }>('/projects', data).then(r => r.data.project),
  update: (id: number, data: Partial<Project>) => api.patch(`/projects/${id}`, data).then(r => r.data.project),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

export const tasksApi = {
  getByProject: (projectId: number) =>
    api.get<{ tasks: Task[] }>(`/projects/${projectId}/tasks`).then(r => r.data.tasks),
  create: (data: Partial<Task>) =>
    api.post<{ task: Task }>('/tasks', data).then(r => r.data.task),
  update: (id: number, data: Partial<Task>) =>
    api.patch<{ task: Task }>(`/tasks/${id}`, data).then(r => r.data.task),
  delete: (id: number) => api.delete(`/tasks/${id}`),
};
