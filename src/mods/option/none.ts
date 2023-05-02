import { Err } from "@hazae41/result"

export class NoneError extends Error {
  constructor() {
    super(`Option is a None`)
  }
}

export class None {

  /**
   * An empty value
   */
  constructor(
    readonly inner = undefined
  ) { }

  /**
   * Create a `None`
   * @returns `None`
   */
  static new(): None {
    return new None()
  }

  /**
   * Type guard for `Some`
   * @returns `true` if `Some`, `false` if `None`
   */
  isSome(): false {
    return false
  }

  /**
   * Type guard for `None`
   * @returns `true` if `None`, `false` if `Some`
   */
  isNone(): this is None {
    return true
  }

  /**
   * Returns an iterator over the possibly contained value
   * @yields `this.inner` if `Some`
   */
  *[Symbol.iterator](): Iterator<never, void> {
    return
  }

  /**
   * Get the inner value or throw a NoneError
   * @returns `this.inner` if `Some`
   * @throws `NoneError` if `None` 
   */
  unwrap(): never {
    throw new NoneError()
  }

  /**
   * Get the inner value or a default one
   * @param value 
   * @returns `this.inner` if `Some`, `value` if `None`
   */
  unwrapOr<U>(value: U): U {
    return value
  }

  /**
   * Transform `Option<T>` into `Result<T, NoneError>`
   * @returns `Ok(this.inner)` if `Some`, `Err(NoneError)` if `None`
   */
  ok(): Err<NoneError> {
    return new Err(new NoneError())
  }

  /**
   * Transform `Option<T>` into `Result<T, E>`
   * @param error
   * @returns `Ok(this.inner)` if `Some`, `Err(error)` if `None`
   */
  okOr<E>(error: E): Err<E> {
    return new Err(error)
  }

  /**
   * Transform `Option<Promise<T>>` into `Promise<Option<T>>`
   * @returns `Promise<Option<T>>`
   */
  async await(): Promise<None> {
    return this
  }

  /**
   * Calls the given callback with the inner value if `Ok`
   * @param someCallback 
   * @returns `this`
   */
  async inspect(someCallback: unknown): Promise<this> {
    return this
  }

  /**
   * Calls the given callback with the inner value if `Ok`
   * @param someCallback 
   * @returns `this`
   */
  inspectSync(someCallback: unknown): this {
    return this
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`)
   * @param someMapper 
   * @returns `Some(await someMapper(this.inner))` if `Some`, `this` if `None`
   */
  async map(someMapper: unknown): Promise<this> {
    return this
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`)
   * @param someMapper 
   * @returns `Some(someMapper(this.inner))` if `Some`, `this` if `None`
   */
  mapSync(someMapper: unknown): this {
    return this
  }

  /**
   * Returns `None` if the option is `None`, otherwise returns `value`
   * @param value 
   * @returns `None` if `None`, `value` if `Some`
   */
  and(value: unknown): this {
    return this
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `someMapper` with the wrapped value and returns the result
   * @param someMapper 
   * @returns `None` if `None`, `await someMapper(this.inner)` if `Some`
   */
  async andThen(someMapper: unknown): Promise<this> {
    return this
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `someMapper` with the wrapped value and returns the result
   * @param someMapper 
   * @returns `None` if `None`, `someMapper(this.inner)` if `Some`
   */
  andThenSync(someMapper: unknown): this {
    return this
  }

  /**
   * Returns `this` if `Some`, otherwise returns `value`
   * @param value 
   * @returns `this` if `Some`, `value` if `None`
   */
  or<U>(value: U): U {
    return value
  }

}