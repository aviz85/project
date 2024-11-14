import { useCallback } from 'react';

export function useCalculator() {
  const calculate = useCallback((expression: string): string => {
    try {
      if (expression.includes('sin')) {
        return Math.sin(eval(expression.replace('sin', ''))).toString();
      }
      if (expression.includes('cos')) {
        return Math.cos(eval(expression.replace('cos', ''))).toString();
      }
      if (expression.includes('sqrt')) {
        return Math.sqrt(eval(expression.replace('sqrt', ''))).toString();
      }
      return eval(expression).toString();
    } catch (error) {
      throw new Error('Invalid expression');
    }
  }, []);

  return { calculate };
}