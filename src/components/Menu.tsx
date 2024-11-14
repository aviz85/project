import { useState } from 'react'

interface MenuProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
  onClearAll: () => void;
  onExport: () => void;
}

export const Menu = ({ onThemeChange, onClearAll, onExport }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => onThemeChange('light')}
              className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
            >
              מצב יום
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
            >
              מצב לילה
            </button>
            <hr className="my-1" />
            <button
              onClick={onExport}
              className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
            >
              ייצא היסטוריה
            </button>
            <button
              onClick={onClearAll}
              className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              נקה הכל
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 