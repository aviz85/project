import React, { useState, useEffect } from 'react';
import { Sun, Moon, History, Memory, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type HistoryItem = {
  expression: string;
  result: string;
};

type MemoryItem = {
  value: number;
  timestamp: Date;
};

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (/[\d+\-*/.=]/.test(key)) {
      event.preventDefault();
      handleInput(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      calculate();
    } else if (key === 'Escape') {
      event.preventDefault();
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expression]);

  const handleInput = (value: string) => {
    if (display === '0' && !isNaN(Number(value))) {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(prev => prev + value);
      setExpression(prev => prev + value);
    }
  };

  const calculate = () => {
    try {
      let result = '';
      if (expression.includes('sin')) {
        result = Math.sin(eval(expression.replace('sin', ''))).toString();
      } else if (expression.includes('cos')) {
        result = Math.cos(eval(expression.replace('cos', ''))).toString();
      } else if (expression.includes('sqrt')) {
        result = Math.sqrt(eval(expression.replace('sqrt', ''))).toString();
      } else {
        result = eval(expression).toString();
      }
      
      setHistory(prev => [...prev, { expression, result }]);
      setDisplay(result);
      setExpression(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const addToMemory = () => {
    const currentValue = parseFloat(display);
    if (!isNaN(currentValue)) {
      setMemory(prev => [...prev, { value: currentValue, timestamp: new Date() }]);
    }
  };

  const recallMemory = (value: number) => {
    setDisplay(value.toString());
    setExpression(value.toString());
  };

  const clearMemory = () => {
    setMemory([]);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className={`calculator-container rounded-2xl shadow-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHistory(prev => !prev)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <History className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowMemory(prev => !prev)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Memory className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Display */}
            <div className={`p-4 text-right text-3xl font-mono ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              {display}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-1 p-2">
              {['sin', 'cos', 'sqrt', 'C'].map(btn => (
                <button
                  key={btn}
                  onClick={() => btn === 'C' ? clear() : handleInput(btn)}
                  className={`p-4 text-lg font-medium rounded ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {btn}
                </button>
              ))}
              {['7', '8', '9', '/'].map(btn => (
                <button
                  key={btn}
                  onClick={() => handleInput(btn)}
                  className={`p-4 text-lg font-medium rounded ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {btn}
                </button>
              ))}
              {['4', '5', '6', '*'].map(btn => (
                <button
                  key={btn}
                  onClick={() => handleInput(btn)}
                  className={`p-4 text-lg font-medium rounded ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {btn}
                </button>
              ))}
              {['1', '2', '3', '-'].map(btn => (
                <button
                  key={btn}
                  onClick={() => handleInput(btn)}
                  className={`p-4 text-lg font-medium rounded ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {btn}
                </button>
              ))}
              {['0', '.', '=', '+'].map(btn => (
                <button
                  key={btn}
                  onClick={() => btn === '=' ? calculate() : handleInput(btn)}
                  className={`p-4 text-lg font-medium rounded ${
                    btn === '=' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* History Sidebar */}
          <div className={`fixed top-0 right-0 h-full w-64 transform ${showHistory ? 'translate-x-0' : 'translate-x-full'} 
            ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-transform duration-300 ease-in-out z-50`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">History</h3>
                <button onClick={() => setShowHistory(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div key={index} className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-sm opacity-75">{item.expression}</div>
                    <div className="text-lg font-medium">{item.result}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Memory Sidebar */}
          <div className={`fixed top-0 right-0 h-full w-64 transform ${showMemory ? 'translate-x-0' : 'translate-x-full'} 
            ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-transform duration-300 ease-in-out z-50`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Memory</h3>
                <button onClick={() => setShowMemory(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={addToMemory}
                  className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Add Current Value (M+)
                </button>
                <button
                  onClick={clearMemory}
                  className="w-full p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Clear Memory (MC)
                </button>
                <div className="space-y-2 mt-4">
                  {memory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => recallMemory(item.value)}
                      className={`w-full p-2 rounded text-left ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-medium">{item.value}</div>
                      <div className="text-xs opacity-75">
                        {item.timestamp.toLocaleTimeString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}