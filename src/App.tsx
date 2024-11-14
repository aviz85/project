import { useState, useEffect } from 'react'
import { ScientificButtons } from './components/ScientificButtons'
import { NumberPad } from './components/NumberPad'
import { History } from './components/History'
import { isValidInput, calculateExpression } from './utils/calculator'
import { Menu } from './components/Menu'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const handleScientific = (value: string) => {
    switch(value) {
      case 'sin':
        calculateExpression(`Math.sin(${equation})`)
        break
      case 'cos':
        calculateExpression(`Math.cos(${equation})`)
        break
      case 'tan':
        calculateExpression(`Math.tan(${equation})`)
        break
      case 'π':
        appendToEquation(Math.PI.toString())
        break
      case '√':
        calculateExpression(`Math.sqrt(${equation})`)
        break
      case 'x²':
        calculateExpression(`(${equation}) * (${equation})`)
        break
      case '%':
        calculateExpression(`(${equation}) / 100`)
        break
      case '±':
        calculateExpression(`-(${equation})`)
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
        calculateExpression(`1/(${equation})`)
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
          const formattedResult = Number.isFinite(result) ? 
            Number(result).toLocaleString('he-IL', { maximumFractionDigits: 4 }) : 
            'שגיאה'
          
          setHistory(prev => [...prev, { 
            equation: equation,
            result: formattedResult 
          }])
          setDisplay(formattedResult)
          setEquation(String(result))
        } catch {
          setDisplay('שגיאה')
          setEquation('')
        }
        break
      default:
        if (!isValidInput(value, equation)) return
        
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

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleExport = () => {
    const historyData = JSON.stringify(history, null, 2)
    const blob = new Blob([historyData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'calculator-history.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearAll = () => {
    setDisplay('0')
    setEquation('')
    setHistory([])
    setMemory(0)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'} p-4`}>
      <div className={`mx-auto max-w-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Menu 
              onThemeChange={handleThemeChange}
              onClearAll={handleClearAll}
              onExport={handleExport}
            />
            <h1 className="text-2xl font-bold">מחשבון מדעי</h1>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-500'} hover:opacity-90 text-white px-3 py-1 rounded`}
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

            <ScientificButtons onScientificClick={handleScientific} />
            <NumberPad onButtonClick={handleClick} />
          </div>
        </div>
      </div>

      <History 
        history={history}
        onHistoryClear={() => setHistory([])}
        onHistoryItemClick={(result) => {
          setDisplay(result)
          setEquation(result)
        }}
      />
    </div>
  )
}

export default App