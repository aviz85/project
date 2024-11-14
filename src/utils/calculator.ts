export const isValidInput = (value: string, currentEquation: string): boolean => {
  if (value === '.' && currentEquation.split(/[-+*/]/).pop()?.includes('.')) {
    return false;
  }
  return true;
}

export const calculateExpression = (expr: string) => {
  try {
    const result = new Function('Math', `return ${expr}`)(Math);
    return Number.isInteger(result) ? 
      result.toString() : 
      result.toFixed(8).replace(/\.?0+$/, '');
  } catch {
    throw new Error('Invalid expression');
  }
} 