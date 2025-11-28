import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../../services/api';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../types';

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function DroppableColumn({ column, tasks }: { column: typeof COLUMNS[0]; tasks: Task[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
      <div
        ref={setNodeRef}
        className={`space-y-3 min-h-[200px] ${isOver ? 'bg-blue-50' : ''}`}
      >
        {tasks.map(task => (
          <DraggableTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${isDragging ? 'opacity-50' : ''}`}
    >
      <TaskCard task={task} />
    </div>
  );
}

export function TaskBoard({ projectId }: { projectId: number }) {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => tasksApi.getByProject(projectId),
  });

  const updateTask = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Task> }) =>
      tasksApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    updateTask.mutate({ id: taskId, updates: { status: newStatus } });
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter(task => task.status === status);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map(column => (
          <DroppableColumn
            key={column.id}
            column={column}
            tasks={getTasksByStatus(column.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
