# Option

Rust-like Option for TypeScript

```bash
npm i @hazae41/option
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/option)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- Similar to Rust
- `unwrap()` for throwing
- `unwrapOr()` for default value
- `map()` for mapping (sync/async)
- `isSome()`/`isNone()` type guards
- `ok()`/`okOr()` for converting to Result from `@hazae41/result`

## Why

**TLDR** `undefined` is too low level and often leads to ugly and repetitive design patterns or bugs

When designing a function, you often encounter the case where you can't pass `undefined`.

```typescript
function doSomething(text: string) {
  return Buffer.from(text, "utf8").toString("base64")
}
```

```typescript
function bigFunction(text?: string) {
  // ...

  doSomething(text) // what if text is undefined?

  // ...
}
```

So you end up checking for `undefined`

### Checking in the caller

```typescript
function bigFunction(text?: string) {
  // ...

  if (text !== undefined) {
    doSomething(text)
  }
  
  // ...
}
```

This is annoying if we want to get the returned value

```typescript
function bigFunction(text?: string) {
  // ...
  
  if (text !== undefined) {
    const text2 = doSomething(text)
  }

  // can't use text2
}
```

Checks become redundant if you need to map the value or throw an error

```typescript
function bigFunction(text?: string) {
  // ...
  
  const text2 = text === undefined
    ? undefined
    : doSomething(text)

  // ...

  const text3 = text2 === undefined
    ? undefined
    : doSomethingElse(text2)

  // ...

  if (text3 === undefined) 
    throw new Error(`something is wrong`)
  
  // use text3
}
```

### Checking in the callee 

Why not check for `undefined` in the callee then?

```typescript 
function maybeDoSomething(text?: string) {
  if (text === undefined) return

  return Buffer.from(text, "utf8").toString("base64")
}
```

If you know your argument is NOT `undefined`, it will force you to check for `undefined` after the call

```typescript
function bigFunction(text: string) {
  // ...
  
  const text2 = doSomething(text) // text is never undefined

  // text2 can now be undefined
}
```

Or even worse, force you to use type assertion

```typescript
function bigFunction(text: string) {
  // ...
  
  const text2 = doSomething(text) as string

  // ...
}
```

### Checking in an intermediary

Let's keep the original function and create an intermediary function for `undefined`

```typescript
function maybeDoSomething(text?: string) {
  if (text === undefined) return

  return doSomething(text)
}
```

Now you have twice the amount of function in your app, and if one of them changes you have to change its intermediary function too

### Using Option

```typescript
function bigFunction(text?: string) {
  const maybeText = Option.from(text)

  // ...
  
  // you want to map it?
  const maybeText2 = maybeText.mapSync(doSomething)

  // ...

  // you want to map it again?
  const maybeText3 = maybeText2.mapSync(doSomethingElse)

  // ...

  // you want to quickly throw an error?
  const text4 = maybeText3.unwrap() // string

  // you want to throw a custom error?
  const text4 = maybeText3.okOr(new Error(`Something is wrong`)).unwrap()

  // you want to get a result?
  const text4 = maybeText3.ok() // Result<string, Error>

  // you want to get a custom result?
  const text4 = maybeText3.okOr(new Error(`Something is wrong`))
  
  // you want to come back to "string | undefined"?
  const text4 = maybeText3.inner // string | undefined

  // you want to do manual check?
  if (maybeText3.isSome())
    const text4 = maybeText3.inner // string
  else
    // ...
}
```