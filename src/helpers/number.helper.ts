export function number(input: any): number {
  if (typeof input === 'string') {
    const dotIndex = input.indexOf('.');
    const commaIndex = input.indexOf(',');

    let decimalSeparator = '.';
    let thousandSeparator = ',';

    if (commaIndex > dotIndex) {
      decimalSeparator = ',';
      thousandSeparator = '.';
    }

    input = input.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '').replace(decimalSeparator, '.');
  }

  if (Number.isNaN(input)) {
    return 0;
  }

  return Number(input || 0);
}

export function clamp(input: any, min: number, max: number) {
  return Math.min(Math.max(number(input), min), max);
}
