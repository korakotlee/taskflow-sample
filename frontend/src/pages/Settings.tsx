import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';

export function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Call API to update user profile
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="input-field w-full bg-gray-50"
          />
          <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleSave}>Save Changes</Button>
          {saved && <span className="text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
