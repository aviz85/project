import React from 'react';
import { Sun, Moon, History, Memory } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type HeaderProps = {
  onHistoryClick: () => void;
  onMemoryClick: () => void;
};

export default function Header({ onHistoryClick, onMemoryClick }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <div className="flex gap-2">
        <button
          onClick={onHistoryClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <History className="w-5 h-5" />
        </button>
        <button
          onClick={onMemoryClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Memory className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}