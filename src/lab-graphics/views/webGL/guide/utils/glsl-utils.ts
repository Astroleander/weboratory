export function glsl(literals: any, ...placeholders: any) {
  let result = '';
  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i];
    result += placeholders[i];
  }
  result += literals[placeholders.length];
  return result;
} 