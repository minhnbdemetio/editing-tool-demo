export function findKeyword(keywords: string[], input: string): string[] {
  const inputLowerCase = input.toLowerCase();

  return keywords.filter(keyword =>
    keyword.toLowerCase().includes(inputLowerCase),
  );
}
