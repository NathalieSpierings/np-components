import { NestedKeyOf } from "..";

/**
 * Resolves the value type at a nested property path.
 * 
 * @example
 * type User = { profile: { name: string } };
 * type Name = NestedValue<User, "profile.name">; // string
*/
export type NestedValue<
  TData,
  TProp extends NestedKeyOf<TData>,
> = TProp extends keyof TData
  ? TData[TProp]
  : TProp extends `${infer K}.${infer Rest}`
    ? K extends keyof TData
      ? Rest extends NestedKeyOf<NonNullable<TData[K]>>
        ? NestedValue<NonNullable<TData[K]>, Rest>
        : never
      : never
    : never;

/**
 * Retrieves a value from an object using a dot-separated property path.
 * 
 * @example
 * const user = { profile: { name: "Alice" } };
 * const name = getNestedValue(user, "profile.name"); // "Alice"
*/
export function getNestedValue<
  TData,
  TProp extends NestedKeyOf<TData>,
>(item: TData, path: TProp): NestedValue<TData, TProp> {
  return path.split(".").reduce(
    (value, key) => value?.[key as keyof typeof value],
    item as unknown,
  ) as NestedValue<TData, TProp>;
}

