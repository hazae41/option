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
   * Returns an iterator over the possibly contained value
   * @yields `this.inner` if `Some`
   */
  *[Symbol.iterator](): Iterator<T, void> {
    yield this.inner
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
   * Transform `Option<Promise<T>>` into `Promise<Option<T>>`
   * @returns `Promise<Option<T>>`
   */
  async await(): Promise<Some<Awaited<T>>> {
    return new Some(await this.inner)
  }

  /**
   * Calls the given callback with the inner value if `Ok`
   * @param someCallback 
   * @returns `this`
   */
  async inspect(someCallback: (inner: T) => Promiseable<void>): Promise<this> {
    await someCallback(this.inner)
    return this
  }

  /**
   * Calls the given callback with the inner value if `Ok`
   * @param someCallback 
   * @returns `this`
   */
  inspectSync(someCallback: (inner: T) => void): this {
    someCallback(this.inner)
    return this
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`)
   * @param someMapper 
   * @returns `Some(await someMapper(this.inner))` if `Some`, `this` if `None`
   */
  async map<U>(someMapper: (inner: T) => Promiseable<U>): Promise<Some<U>> {
    return new Some<U>(await someMapper(this.inner))
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`)
   * @param someMapper 
   * @returns `Some(someMapper(this.inner))` if `Some`, `this` if `None`
   */
  mapSync<U>(someMapper: (inner: T) => U): Some<U> {
    return new Some<U>(someMapper(this.inner))
  }

  /**
   * Returns `None` if the option is `None`, otherwise returns `value`
   * @param value 
   * @returns `None` if `None`, `value` if `Some`
   */
  and<U>(value: U): U {
    return value
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `someMapper` with the wrapped value and returns the result
   * @param someMapper 
   * @returns `None` if `None`, `await someMapper(this.inner)` if `Some`
   */
  async andThen<U>(someMapper: (inner: T) => Promiseable<U>): Promise<U> {
    return await someMapper(this.inner)
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `someMapper` with the wrapped value and returns the result
   * @param someMapper 
   * @returns `None` if `None`, `someMapper(this.inner)` if `Some`
   */
  andThenSync<U>(someMapper: (inner: T) => U): U {
    return someMapper(this.inner)
  }

  /**
   * Returns `this` if `Some`, otherwise returns `value`
   * @param value 
   * @returns `this` if `Some`, `value` if `None`
   */
  or(value: unknown): this {
    return this
  }

}