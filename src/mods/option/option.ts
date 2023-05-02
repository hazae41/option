import { None } from "./none.js";
import { Some } from "./some.js";

export type Option<T> =
  | Some<T>
  | None

export namespace Option {

  /**
   * Create an Option from a maybe undefined value
   * @param inner 
   * @returns `Some<T>` if `T`, `None` if `undefined`
   */
  export function from<T>(inner: T | undefined): Option<T> {
    if (inner === undefined)
      return new None()
    else
      return new Some(inner)
  }

}