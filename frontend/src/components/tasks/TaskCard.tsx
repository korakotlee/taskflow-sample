import { format } from 'date-fns';
import type { Task } from '../../types';

export function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{task.title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        {task.assignee && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
              {task.assignee.name.charAt(0)}
            </div>
            <span>{task.assignee.name}</span>
          </div>
        )}

        {task.due_date && (
          <span className={isOverdue(task.due_date) ? 'text-red-600 font-medium' : ''}>
            {format(new Date(task.due_date), 'MMM d')}
          </span>
        )}
      </div>
    </div>
  );
}

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}
