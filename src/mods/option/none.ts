import { Err } from "@hazae41/result"

export class NoneError extends Error {
  constructor() {
    super(`Unwrapped None`)
  }
}

export class None {

  readonly inner = undefined

  isSome(): false {
    return false
  }

  isNone(): this is None {
    return true
  }

  unwrap(): never {
    throw new NoneError()
  }

  unwrapOr<O>(or: O) {
    return or
  }

  ok() {
    return new Err(new NoneError())
  }

  okOr<E>(error: E) {
    return new Err(error)
  }

  async map(mapper: unknown) {
    return this
  }

  mapSync(mapper: unknown) {
    return this
  }

}