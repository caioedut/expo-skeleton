export function number(value: any): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Number(value || 0);
}

export function clamp(value: any, min: number, max: number) {
  return Math.min(Math.max(number(value), min), max);
}
