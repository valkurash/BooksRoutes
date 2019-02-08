declare module 'immutable-stringify' {
  import { Map, Record, List } from 'immutable';

  export function dehydrateImmutable<T>(
    immu: Map<string, T> | Record<T> | List<T>
  ): string;
  export function hydrateImmutable<T>(
    immu: string
  ): Map<string, T> | Record<T> | List<T>;
}
