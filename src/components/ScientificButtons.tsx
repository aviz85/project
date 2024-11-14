interface ScientificButtonsProps {
  onScientificClick: (value: string) => void;
}

export const ScientificButtons = ({ onScientificClick }: ScientificButtonsProps) => {
  const scientificButtons = [
    ['sin', 'cos', 'tan', 'π'],
    ['√', 'x²', '%', '±'],
    ['(', ')', 'MC', 'MR'],
    ['M+', 'M-', 'MS', '1/x'],
  ]

  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {scientificButtons.map((row) => (
        row.map((btn) => (
          <button
            key={btn}
            onClick={() => onScientificClick(btn)}
            className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded text-sm"
          >
            {btn}
          </button>
        ))
      ))}
    </div>
  )
} 