import * as DateFNS from 'date-fns';
import { ptBR } from 'date-fns/locale';

DateFNS.setDefaultOptions({ locale: ptBR });

export type DateInput = Date | null | number | string | undefined;

export function date(input?: DateInput) {
  let date = new Date();

  if (typeof input === 'string') {
    date = new Date(input.substring(0, 10).split('/').reverse().join('-') + input.substring(10, 22));
  }

  if (typeof input === 'number') {
    date = new Date(input);
  }

  if (input instanceof Date) {
    date = new Date(input.getTime());
  }

  return date;
}

export function iso(input: DateInput) {
  if (!input) return '';
  return DateFNS.format(date(input), `yyyy-MM-dd'T'HH:mm:ss`);
}

export function isoLocalToUtc(input: DateInput) {
  if (!input) return '';
  const value = date(input);
  return iso(add(value, { minutes: value.getTimezoneOffset() }));
}

export function isoUtcToLocal(input: DateInput) {
  if (!input) return '';
  const value = date(input);
  return iso(add(value, { minutes: -value.getTimezoneOffset() }));
}

export function format(input: DateInput, formatString: string | true = 'dd/MM/yyyy') {
  if (!input) return '';

  if (formatString === true) {
    formatString = 'dd/MM/yyyy HH:mm';
  }

  const oldDt = date(input);
  const newDt = add(oldDt, { minutes: -oldDt.getTimezoneOffset() });

  return DateFNS.format(newDt, formatString);
}

export function humanize(input: DateInput) {
  return format(input, `dd/MM/yyyy', às 'HH'h'mm`).replace(/h00$/, 'h');
}

export function distance(from: DateInput, to?: DateInput) {
  return DateFNS.formatDistance(date(from), date(to));
}

export function add(input: DateInput, duration: DateFNS.Duration) {
  return DateFNS.add(date(input), duration);
}

export function sub(input: DateInput, duration: DateFNS.Duration) {
  return DateFNS.sub(date(input), duration);
}

export function isExpired(input: DateInput) {
  return DateFNS.isAfter(new Date(), date(input));
}

export function start(input: DateInput) {
  return DateFNS.startOfDay(date(input));
}

export function end(input: DateInput) {
  return DateFNS.endOfDay(date(input));
}

export function difference(
  dateLeft: DateInput,
  dateRight: DateInput,
  type: 'days' | 'hours' | 'milliseconds' | 'minutes' | 'months' | 'seconds' | 'weeks' | 'years' = 'days',
) {
  dateLeft = date(dateLeft);
  dateRight = date(dateRight);

  let diff: null | number = null;

  switch (type) {
    case 'days':
      diff = DateFNS.differenceInDays(dateLeft, dateRight);
      break;
    case 'hours':
      diff = DateFNS.differenceInHours(dateLeft, dateRight);
      break;
    case 'milliseconds':
      diff = DateFNS.differenceInMilliseconds(dateLeft, dateRight);
      break;
    case 'minutes':
      diff = DateFNS.differenceInMinutes(dateLeft, dateRight);
      break;
    case 'months':
      diff = DateFNS.differenceInMonths(dateLeft, dateRight);
      break;
    case 'seconds':
      diff = DateFNS.differenceInSeconds(dateLeft, dateRight);
      break;
    case 'weeks':
      diff = DateFNS.differenceInWeeks(dateLeft, dateRight);
      break;
    case 'years':
      diff = DateFNS.differenceInYears(dateLeft, dateRight);
      break;
  }

  return diff;
}
