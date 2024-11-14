import React from 'react';
import { useTheme } from '../context/ThemeContext';

type DisplayProps = {
  value: string;
};

export default function Display({ value }: DisplayProps) {
  const { isDark } = useTheme();
  
  return (
    <div className={`p-4 text-right text-3xl font-mono ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
      {value}
    </div>
  );
}