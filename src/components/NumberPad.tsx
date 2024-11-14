interface NumberPadProps {
  onButtonClick: (value: string) => void;
}

export const NumberPad = ({ onButtonClick }: NumberPadProps) => {
  const buttons = [
    'CE', '⌫', 'C', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ]

  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((btn) => (
        <button 
          key={btn}
          onClick={() => onButtonClick(btn)}
          className={`
            ${btn === '=' ? 'col-span-2' : ''} 
            ${['CE', '⌫', 'C'].includes(btn) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}
            text-white p-2 rounded
          `}
        >
          {btn}
        </button>
      ))}
    </div>
  )
} 