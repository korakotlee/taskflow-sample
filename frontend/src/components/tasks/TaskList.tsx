import { useState, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import type { Task } from '../../types';

export function TaskList({ projectId }: { projectId: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${projectId}/tasks`);
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [projectId]); // Re-run when projectId changes

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
