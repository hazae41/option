import { Promiseable } from "libs/promises/promises.js";
import { None, NoneInit } from "./none.js";
import { Some, SomeInit } from "./some.js";

export type Optional<T> =
  T | undefined

export type NonOptional<T> =
  T & ({} | null)

export type Option<T> =
  | Some<T>
  | None

export type OptionInit<T> =
  | SomeInit<T>
  | NoneInit

export namespace Option {

  export function from<T>(init: OptionInit<T>): Option<T> {
    if ("inner" in init)
      return new Some(init.inner)
    return new None()
  }

  /**
   * Create an Option from a maybe undefined value
   * @param inner 
   * @returns `Some<T>` if `T`, `None` if `undefined`
   */
  export function wrap<T>(inner: Optional<T>): Option<NonOptional<T>> {
    if (inner === undefined)
      return new None()
    return new Some(inner)
  }

  export async function map<T, U>(inner: Optional<T>, mapper: (inner: T) => Promiseable<U>) {
    return Option.wrap(inner).map(mapper).then(o => o.get())
  }

  export function mapSync<T, U>(inner: Optional<T>, mapper: (inner: T) => U) {
    return Option.wrap(inner).mapSync(mapper).get()
  }

  export function unwrap<T>(inner: Optional<T>) {
    return Option.wrap(inner).unwrap()
  }

}