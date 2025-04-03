export type AnyObject = Record<PropertyKey, any>;

export type ArrayValues<Arr extends readonly any[]> = Arr[number];

export type Falsy<T> = 0 | 0n | '' | false | null | T | undefined;

export type ObjectValues<Obj extends AnyObject> = Obj[keyof Obj];

export type PaginationProps = {
  limit: number;
  order: string;
  page: number;
  pages: number;
  sort: 'asc' | 'desc';
};
