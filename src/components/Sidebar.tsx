import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type SidebarProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Sidebar({ title, isOpen, onClose, children }: SidebarProps) {
  const { isDark } = useTheme();

  return (
    <div className={`fixed top-0 right-0 h-full w-64 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
      ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}