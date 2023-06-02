import { Promiseable } from "libs/promises/promises.js";
import { None } from "./none.js";
import { Some } from "./some.js";

export type Optional<T> =
  | T
  | undefined

export type Option<T> =
  | Some<T>
  | None

export namespace Option {

  /**
   * Create an Option from a maybe undefined value
   * @param inner 
   * @returns `Some<T>` if `T`, `None` if `undefined`
   */
  export function from<T>(inner: Optional<T>): Option<T> {
    if (inner === undefined)
      return new None()
    else
      return new Some(inner)
  }

  export async function map<T, U>(inner: Optional<T>, mapper: (inner: T) => Promiseable<U>) {
    return Option.from(inner).map(mapper).then(o => o.get())
  }

  export function mapSync<T, U>(inner: Optional<T>, mapper: (inner: T) => U) {
    return Option.from(inner).mapSync(mapper).get()
  }

}