import { Promiseable } from "libs/promises/promises.js";
import { None } from "./none.js";
import { Some } from "./some.js";

export type Option<T> =
  | Some<T>
  | None

export namespace Option {

  export function from<T>(inner: T | undefined): Option<T> {
    if (inner === undefined)
      return new None()
    else
      return new Some(inner)
  }

  export async function map<T, M>(inner: T | undefined, mapper: (inner: T) => Promiseable<M>) {
    return (await Option.from(inner).map(mapper)).inner
  }

  export function mapSync<T, M>(inner: T | undefined, mapper: (inner: T) => M) {
    return Option.from(inner).mapSync(mapper).inner
  }

}