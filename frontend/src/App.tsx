import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProjectView } from './pages/ProjectView';
import { Signup } from './pages/Signup';
import { PrivateRoute } from './components/PrivateRoute';
import { Layout } from './components/layout/Layout';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
// Note: `useAuth` is used inside page components — not needed at top-level App

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects/:id" element={<ProjectView />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
