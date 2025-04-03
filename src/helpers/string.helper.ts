export function string(input: any): string {
  if ([null, undefined].includes(input)) {
    return '';
  }

  if (!Number.isNaN(Number(input))) {
    return input.toString();
  }

  return `${input || ''}`;
}

export function random(length = 10) {
  let result = '';

  while (result.length < length) {
    result += Math.random().toString(36).slice(2);
  }

  return result.substring(0, length);
}

export function removeSpecial(input: any): string {
  return string(input)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function pluralize(count: number, input: any, plural?: string): string {
  input = string(input);
  if (!input) return '';
  plural = plural ?? `${input}s`.replace(/ss$/, 's');
  return count > 1 ? plural : input;
}

export function unmask(input: any, replaceRegex = /\W+/g, replaceValue = ''): string {
  return string(input).replace(replaceRegex, replaceValue);
}

export function mask(
  input: any,
  pattern: 'alpha-numeric' | 'cep' | 'cnpj' | 'cpf' | 'cpf/cnpj' | 'date' | 'money' | 'numeric' | 'phone' | string,
  fillWith?: string,
): string {
  input = unmask(input);

  if (pattern === 'numeric') {
    return input.replace(/\D/g, '');
  }

  if (pattern === 'alpha-numeric') {
    return removeSpecial(input).replace(/[^a-zA-Z0-9]/gi, '');
  }

  if (pattern === 'money') {
    // Convert to number
    input = +input.replace(/\D/g, '');

    // Convert to string and pad 0 to start
    input = `${input}`.padStart(3, '0');

    // Apply ","
    input = `${input.slice(0, -2)},${input.substr(-2)}`;

    return input;
  }

  if (pattern === 'cpf/cnpj') {
    pattern = input?.length > 11 ? 'cnpj' : 'cpf';
  }

  if (pattern === 'phone') {
    input = input.replace(/\D/g, '').replace(/^0+/, '');
    pattern = input.length > 10 ? '(##) # ####-####' : '(##) ####-####';
  }

  const defined: Record<string, string> = {
    cep: '##.###-###',
    cnpj: '##.###.###.####/##',
    cpf: '###.###.###-##',
    date: '##/##/####',
  };

  pattern = defined[pattern] || pattern;

  let maskared = '';
  let sIndex = 0;

  for (let mIndex = 0; mIndex < pattern.length; mIndex += 1) {
    if (!input[sIndex]) {
      break;
    }

    // @ts-ignore
    if (pattern[mIndex] === '#') {
      maskared += input[sIndex];
      sIndex += 1;
    } else {
      // @ts-ignore
      maskared += pattern[mIndex];
    }
  }

  if (fillWith) {
    maskared = `${maskared}${fillWith.substring(maskared.length)}`;
  }

  return maskared;
}

export function color(input: any | string) {
  let hash = 0;
  let colour = '#';

  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }

  return colour;
}

export function stripTags(input: any | string, allowed?: any | string) {
  input = string(input).replace(/<br ?\/?>/g, '\n');

  allowed = (
    string(allowed)
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || []
  ).join('');

  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

  return input.replace(commentsAndPhpTags, '').replace(tags, ($0: string, $1: string) => {
    return allowed.indexOf(`<${$1.toLowerCase()}>`) > -1 ? $0 : '';
  });
}

export function removeSuffix(value: any, identifier = '_') {
  let result = string(value);

  if (result.includes(identifier)) {
    result = result.substring(0, result.lastIndexOf(identifier));
  }

  return result;
}

export function firstLast(input: any) {
  const split = string(input).split(' ');
  return `${split.shift() ?? ''} ${split.pop() ?? ''}`.trim();
}
