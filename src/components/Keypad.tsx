import React from 'react';
import { useTheme } from '../context/ThemeContext';

type KeypadProps = {
  onButtonClick: (value: string) => void;
  onCalculate: () => void;
  onClear: () => void;
};

export default function Keypad({ onButtonClick, onCalculate, onClear }: KeypadProps) {
  const { isDark } = useTheme();
  
  const buttons = [
    'sin', 'cos', 'sqrt', 'C',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const getButtonClass = (btn: string) => {
    const baseClass = 'p-4 text-lg font-medium rounded transition-colors';
    if (btn === '=') {
      return `${baseClass} bg-blue-500 hover:bg-blue-600 text-white`;
    }
    return `${baseClass} ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`;
  };

  const handleClick = (btn: string) => {
    if (btn === '=') onCalculate();
    else if (btn === 'C') onClear();
    else onButtonClick(btn);
  };

  return (
    <div className="grid grid-cols-4 gap-1 p-2">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => handleClick(btn)}
          className={getButtonClass(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}