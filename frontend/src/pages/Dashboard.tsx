import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/common/Button';
// NOTE: Create project UI is out of scope for the sample; keep page minimal
// project type available in src/types when needed

export function Dashboard() {
  // Fetch projects
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  });

  // Placeholder - create project handling exists in full app

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button onClick={() => console.log('create project')}>
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(projects || []).map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
