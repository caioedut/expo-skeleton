import { AnyObject } from '@/types/util.type';

/**
 * retorna undefined se o valor é undefined, null ou ''
 * caso contrário, retorna o retorno de "caster()"
 */
export function cast<T>(value: any, caster: (value: any) => T) {
  return ['', null, undefined].includes(value) ? undefined : caster(value);
}

/**
 * retorna o primeiro valor que não é undefined, null ou ''
 * retorna undefined se não encontrar
 */
export function coalesce<T>(...values: any[]) {
  for (const value of values) {
    if (!['', null, undefined].includes(value)) {
      return value as T;
    }
  }

  return undefined;
}

export function defined(value: any) {
  return ![null, undefined].includes(value);
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function match(key: string, options: AnyObject) {
  return key in options ? options[key] : 'default' in options ? options.default : undefined;
}
