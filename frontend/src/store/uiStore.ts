import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedTaskId: number | null;
  selectTask: (id: number | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  selectedTaskId: null,
  selectTask: (id) => set({ selectedTaskId: id }),
}));
