interface HistoryItem {
  equation: string;
  result: string;
}

interface HistoryProps {
  history: HistoryItem[];
  onHistoryClear: () => void;
  onHistoryItemClick: (result: string) => void;
}

export const History = ({ history, onHistoryClear, onHistoryItemClick }: HistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">היסטוריית חישובים</h2>
        <button 
          onClick={onHistoryClear}
          className="text-red-400 hover:text-red-500"
        >
          נקה היסטוריה
        </button>
      </div>
      <div className="space-y-2 text-right">
        {history.map((calc, index) => (
          <div 
            key={index}
            className="p-2 hover:bg-blue-50 rounded cursor-pointer"
            onClick={() => onHistoryItemClick(calc.result)}
          >
            {calc.equation} = {calc.result}
          </div>
        ))}
      </div>
    </div>
  )
} 