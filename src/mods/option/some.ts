import { Ok } from "@hazae41/result"
import { Promiseable } from "libs/promises/promises.js"

export class Some<T> {

  constructor(
    readonly inner: T
  ) { }

  isSome(): this is Some<T> {
    return true
  }

  isNone(): false {
    return false
  }

  unwrap() {
    return this.inner
  }

  unwrapOr(or: unknown) {
    return this.inner
  }

  ok() {
    return new Ok(this.inner)
  }

  okOr(error: unknown) {
    return new Ok(this.inner)
  }

  /**
   * Map the inner, throwing if mapper throws
   * @param mutator 
   * @returns 
   */
  async map<M>(mapper: (inner: T) => Promiseable<M>) {
    return new Some<M>(await mapper(this.inner))
  }

  /**
   * Map this data into another, throwing if mapper throws
   * @param mutator 
   * @returns 
   */
  mapSync<M>(mapper: (inner: T) => M) {
    return new Some<M>(mapper(this.inner))
  }

}