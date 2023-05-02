import { Ok } from "@hazae41/result"
import { Promiseable } from "libs/promises/promises.js"

export class Some<T> {

  /**
   * An existing value
   * @param inner 
   */
  constructor(
    readonly inner: T
  ) { }

  /**
   * Create a `Some`
   * @param inner 
   * @returns `Some(inner)`
   */
  static new<T>(inner: T): Some<T> {
    return new this<T>(inner)
  }

  /**
   * Type guard for `Some`
   * @returns `true` if `Some`, `false` if `None`
   */
  isSome(): this is Some<T> {
    return true
  }

  /**
   * Type guard for `None`
   * @returns `true` if `None`, `false` if `Some`
   */
  isNone(): false {
    return false
  }

  /**
   * Get the inner value or throw a NoneError
   * @returns `this.inner` if `Some`
   * @throws `NoneError` if `None` 
   */
  unwrap(): T {
    return this.inner
  }

  /**
   * Get the inner value or a default one
   * @param value 
   * @returns `this.inner` if `Some`, `value` if `None`
   */
  unwrapOr(value: unknown): T {
    return this.inner
  }

  /**
   * Transform `Option<T>` into `Result<T, NoneError>`
   * @returns `Ok(this.inner)` if `Some`, `Err(NoneError)` if `None`
   */
  ok(): Ok<T> {
    return new Ok(this.inner)
  }

  /**
   * Transform `Option<T>` into `Result<T, E>`
   * @param error
   * @returns `Ok(this.inner)` if `Some`, `Err(error)` if `None`
   */
  okOr(error: unknown): Ok<T> {
    return new Ok(this.inner)
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`)
   * @param mapper 
   * @returns `Some(await mapper(this.inner))` if `Some`, `this` if `None`
   */
  async map<U>(mapper: (inner: T) => Promiseable<U>): Promise<Some<U>> {
    return new Some<U>(await mapper(this.inner))
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`)
   * @param mapper 
   * @returns `Some(mapper(this.inner))` if `Some`, `this` if `None`
   */
  mapSync<U>(mapper: (inner: T) => U): Some<U> {
    return new Some<U>(mapper(this.inner))
  }

}