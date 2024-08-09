export function cipher(key: string, text: string, encode: boolean): string {
  const shift = (c: string, k: number): string => {
    const code = c.charCodeAt(0);
    const offset = code >= 65 && code <= 90 ? 65 : 97;
    return String.fromCharCode(((code - offset + k) % 26) + offset);
  };

  return text.split('').map((char, i) => {
    if (!/[a-zA-Z]/.test(char)) return char;

    const keyChar = key[i % key.length];
    const keyShift = (encode ? 1 : -1) * (keyChar.toLowerCase().charCodeAt(0) - 97);
    return shift(char, keyShift);
  }).join('');
}
