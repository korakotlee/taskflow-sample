import { useNavigate } from 'react-router-dom';
import type { Project } from '../types';

export function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
}
