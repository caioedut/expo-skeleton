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

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function clamp(input: any, min: number, max: number) {
  return Math.min(Math.max(number(input), min), max);
}

export function currency(input: any, prefix = 'R$ ') {
  const value = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number(input));

  return `${prefix}${value}`;
}
