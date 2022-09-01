type ObjectKeys<T> =
  T extends object ? (keyof T)[] :
  T extends number ? [] :
  T extends Array<unknown> | string ? string[] :
  never;

interface ObjectConstructor {
    // eslint-disable-next-line no-unused-vars
    keys<T>(o: T): ObjectKeys<T>
  }
