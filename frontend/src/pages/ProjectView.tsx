import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../services/api';
import { TaskBoard } from '../components/tasks/TaskBoard';
import { CreateTaskModal } from '../components/tasks/CreateTaskModal';
import { Button } from '../components/common/Button';
// project type available in src/types when needed

export function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: project } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => projectsApi.getOne(projectId),
  });

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          {project.description && (
            <p className="text-gray-600 mt-2">{project.description}</p>
          )}
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Add Task
        </Button>
      </div>

      <TaskBoard projectId={projectId} />

      {showCreateModal && (
        <CreateTaskModal
          projectId={projectId}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
