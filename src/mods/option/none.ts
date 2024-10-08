import { Err, Panic } from "@hazae41/result"
import { Awaitable } from "libs/awaitable/index.js"
import { Option } from "./option.js"


export class NoneError extends Error {

  constructor() {
    super(`Option is a None`)
  }

}

export interface NoneInit {
  /* Nothing */
}

export class None {

  /**
   * An empty value
   */
  constructor(
    readonly inner = undefined
  ) { }

  static create(): None {
    return new None()
  }

  static from(init: NoneInit) {
    return new None()
  }

  /**
   * Returns an iterator over the possibly contained value
   * @yields `this.inner` if `Some`
   */
  *[Symbol.iterator](): Iterator<never, void> {
    return
  }

  /**
   * Type guard for `Some`
   * @returns `true` if `Some`, `false` if `None`
   */
  isSome(): false {
    return false
  }

  /**
   * Returns `true` if the option is a `Some` and the value inside of it matches a predicate
   * @param somePredicate 
   * @returns `true` if `Some` and `await somePredicate(this.inner)`, `None` otherwise
   */
  async isSomeAnd(somePredicate: unknown): Promise<false> {
    return false
  }

  /**
   * Returns `true` if the option is a `Some` and the value inside of it matches a predicate
   * @param somePredicate 
   * @returns `true` if `Some` and `somePredicate(this.inner)`, `None` otherwise
   */
  isSomeAndSync(somePredicate: unknown): false {
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
   * Compile-time safely get `this.inner`
   * @returns `this.inner`
   */
  get(this: never): never {
    throw new Panic()
  }

  /**
   * Get the inner value or throw an error
   * @returns 
   */
  getOrThrow(): never {
    throw new NoneError()
  }

  /**
   * Get the inner value or `null`
   * @returns 
   */
  getOrNull(): undefined {
    return
  }

  /**
   * Get the inner value or a default one
   * @param value 
   * @returns `this.inner` if `Some`, `value` if `None`
   */
  getOr<U>(value: U): U {
    return value
  }

  /**
   * Returns the contained `Some` value or computes it from a closure
   * @param noneCallback 
   * @returns `this.inner` if `Some`, `await noneCallback()` if `None`
   */
  async getOrElse<U>(noneCallback: () => Awaitable<U>): Promise<U> {
    return await noneCallback()
  }

  /**
   * Returns the contained `Some` value or computes it from a closure
   * @param noneCallback 
   * @returns `this.inner` if `Some`, `noneCallback()` if `None`
   */
  getOrElseSync<U>(noneCallback: () => U): U {
    return noneCallback()
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
   * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`
   * @param noneCallback 
   * @returns `Ok(this.inner)` if `Some`, `Err(await noneCallback())` is `None`
   */
  async okOrElse<U>(noneCallback: () => Awaitable<U>): Promise<Err<U>> {
    return new Err(await noneCallback())
  }

  /**
   * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`
   * @param noneCallback 
   * @returns `Ok(this.inner)` if `Some`, `Err(noneCallback())` is `None`
   */
  okOrElseSync<U>(noneCallback: () => U): Err<U> {
    return new Err(noneCallback())
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `somePredicate` with the wrapped value
   * @param somePredicate 
   * @returns `Some` if `Some` and `await somePredicate(this.inner)`, `None` otherwise
   */
  async filter(somePredicate: unknown): Promise<this> {
    return this
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `somePredicate` with the wrapped value
   * @param somePredicate 
   * @returns `Some` if `Some` and `somePredicate(this.inner)`, `None` otherwise
   */
  filterSync(somePredicate: unknown): this {
    return this
  }

  /**
   * Transform `Option<Promise<T>>` into `Promise<Option<T>>`
   * @returns `Promise<Option<T>>`
   */
  async await(): Promise<None> {
    return this
  }

  /**
   * Returns `true` if the option is a `Some` value containing the given value
   * @param value 
   * @returns `true` if `Some` and `this.inner === value`, `None` otherwise
   */
  contains(value: unknown): false {
    return false
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
   * Returns the provided default result (if none), or applies a function to the contained value (if any)
   * @param value 
   * @param someMapper 
   * @returns `value` if `None`, `await someMapper(this.inner)` if `Some`
   */
  async mapOr<U>(value: U, someMapper: unknown): Promise<U> {
    return value
  }

  /**
   * Returns the provided default result (if none), or applies a function to the contained value (if any)
   * @param value 
   * @param someMapper 
   * @returns `value` if `None`, `someMapper(this.inner)` if `Some`
   */
  mapOrSync<U>(value: U, someMapper: unknown): U {
    return value
  }

  /**
   * Computes a default function result (if none), or applies a different function to the contained value (if any)
   * @param noneCallback 
   * @param someMapper 
   * @returns `await someMapper(this.inner)` if `Some`, `await noneCallback()` if `None`
   */
  async mapOrElse<U>(noneCallback: () => Awaitable<U>, someMapper: unknown): Promise<U> {
    return await noneCallback()
  }

  /**
   * Computes a default function result (if none), or applies a different function to the contained value (if any)
   * @param noneCallback 
   * @param someMapper 
   * @returns `someMapper(this.inner)` if `Some`, `noneCallback()` if `None`
   */
  mapOrElseSync<U>(noneCallback: () => U, someMapper: unknown): U {
    return noneCallback()
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

  /**
   * Returns `this` if `Some`, otherwise calls `noneCallback` and returns the result
   * @param noneCallback 
   * @returns `this` if `Some`, `await noneCallback()` if `None`
   */
  async orElse<U>(noneCallback: () => Awaitable<U>): Promise<U> {
    return await noneCallback()
  }

  /**
   * Returns `this` if `Some`, otherwise calls `noneCallback` and returns the result
   * @param noneCallback 
   * @returns `this` if `Some`, `noneCallback()` if `None`
   */
  orElseSync<U>(noneCallback: () => U): U {
    return noneCallback()
  }

  /**
   * Returns `Some` if exactly one of the options is `Some`, otherwise returns `None`
   * @param value 
   * @returns `None` if both are `Some` or both are `None`, the only `Some` otherwise
   */
  xor<U>(value: Option<U>): Option<U> {
    return value
  }

  /**
   * Zips `this` with another `Option`
   * @param other 
   * @returns `Some([this.inner, other.inner])` if both are `Some`, `None` if one of them is `None`
   */
  zip(other: unknown): None {
    return this
  }

}