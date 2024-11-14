import { useState, useEffect } from 'react'
import './App.css'

interface HistoryItem {
  equation: string
  result: string
}

function App() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [memory, setMemory] = useState<number>(0)
  const [showHistory, setShowHistory] = useState(false)

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'π'],
    ['√', 'x²', '%', '±'],
    ['(', ')', 'MC', 'MR'],
    ['M+', 'M-', 'MS', '1/x'],
  ]

  const handleScientific = (value: string) => {
    switch(value) {
      case 'sin':
        calculate(`Math.sin(${equation})`)
        break
      case 'cos':
        calculate(`Math.cos(${equation})`)
        break
      case 'tan':
        calculate(`Math.tan(${equation})`)
        break
      case 'π':
        appendToEquation(Math.PI.toString())
        break
      case '√':
        calculate(`Math.sqrt(${equation})`)
        break
      case 'x²':
        calculate(`(${equation}) * (${equation})`)
        break
      case '%':
        calculate(`(${equation}) / 100`)
        break
      case '±':
        calculate(`-(${equation})`)
        break
      case 'MC':
        setMemory(0)
        break
      case 'MR':
        appendToEquation(memory.toString())
        break
      case 'M+':
        setMemory(memory + Number(display))
        break
      case 'M-':
        setMemory(memory - Number(display))
        break
      case 'MS':
        setMemory(Number(display))
        break
      case '1/x':
        calculate(`1/(${equation})`)
        break
    }
  }

  const calculate = (expr: string) => {
    try {
      // Using Function with Math methods enabled
      const result = new Function('Math', `return ${expr}`)(Math)
      const formattedResult = Number.isInteger(result) ? 
        result.toString() : 
        result.toFixed(8).replace(/\.?0+$/, '')
      
      setHistory(prev => [...prev, { equation: expr, result: formattedResult }])
      setDisplay(formattedResult)
      setEquation(formattedResult)
    } catch {
      setDisplay('Error')
      setEquation('')
    }
  }

  const appendToEquation = (value: string) => {
    if (equation === '0' || display === 'Error') {
      setEquation(value)
      setDisplay(value)
    } else {
      setEquation(prev => prev + value)
      setDisplay(prev => prev + value)
    }
  }

  const handleClick = (value: string) => {
    switch(value) {
      case 'C':
        setDisplay('0')
        setEquation('')
        break
      case 'CE':
        setDisplay('0')
        setEquation('')
        break
      case '⌫':
        if (equation.length > 1) {
          setEquation(prev => prev.slice(0, -1))
          setDisplay(prev => prev.slice(0, -1))
        } else {
          setEquation('0')
          setDisplay('0')
        }
        break
      case '=':
        try {
          const result = new Function('return ' + equation)()
          setDisplay(String(result))
          setEquation(String(result))
        } catch {
          setDisplay('Error')
          setEquation('')
        }
        break
      default:
        // מונע הוספת אופרטור כתו ראשון (חוץ ממינוס)
        if (['+', '*', '/', '.'].includes(value) && equation === '') {
          return
        }
        // מונע כפל אופרטורים
        if (['+', '-', '*', '/', '.'].includes(value) && 
            ['+', '-', '*', '/', '.'].includes(equation.slice(-1))) {
          setEquation(prev => prev.slice(0, -1) + value)
          setDisplay(prev => prev.slice(0, -1) + value)
          return
        }
        
        if (equation === '0' && !isNaN(Number(value))) {
          setEquation(value)
          setDisplay(value)
        } else {
          setEquation(prev => prev + value)
          setDisplay(prev => prev + value)
        }
    }
  }

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.match(/[0-9.+\-*/%()=]/) || e.key === 'Enter') {
        e.preventDefault()
        if (e.key === 'Enter') {
          calculate(equation)
        } else {
          appendToEquation(e.key)
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        if (equation.length > 1) {
          setEquation(prev => prev.slice(0, -1))
          setDisplay(prev => prev.slice(0, -1))
        } else {
          setEquation('0')
          setDisplay('0')
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [equation])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">מחשבון מדעי</h1>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
          >
            היסטוריה
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="bg-gray-50 p-4 rounded mb-4">
              {memory !== 0 && (
                <div className="text-right text-sm text-gray-500 mb-1">M: {memory}</div>
              )}
              <div className="text-right text-2xl font-mono">{display}</div>
            </div>

            {/* Scientific buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {scientificButtons.map((row, i) => (
                row.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleScientific(btn)}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded text-sm"
                  >
                    {btn}
                  </button>
                ))
              ))}
            </div>

            {/* Regular buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[
                'CE', '⌫', 'C', '/',
                '7', '8', '9', '*',
                '4', '5', '6', '-',
                '1', '2', '3', '+',
                '0', '.', '=',
              ].map((btn) => (
                <button 
                  key={btn}
                  onClick={() => handleClick(btn)}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default App