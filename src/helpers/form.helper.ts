import { z, ZodError, ZodRawShape } from 'zod';

export function prepare<T extends ZodRawShape>(data: unknown, shape: T) {
  const schema = z.object(shape);
  type Inferred = z.infer<typeof schema>;

  let parsed: Inferred | null = null;
  let errors: null | Partial<Record<keyof Inferred, string>> = null;

  try {
    parsed = schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      errors = err.issues.reduce(
        (acc, current) => {
          const key = current.path[0] as keyof Inferred;
          acc[key] = current.message;
          return acc;
        },
        {} as Partial<Record<keyof Inferred, string>>,
      );
    }
  }

  return {
    data: parsed || (data as Inferred),
    errors,
    schema,
  } as const;
}
