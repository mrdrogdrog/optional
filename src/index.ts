/*
 * SPDX-FileCopyrightText: 2022 Tilman Vatteroth
 *
 * SPDX-License-Identifier: MIT
 */

/**
 * A container object that wraps possibly undefined values.
 */
export class Optional<T> {
  private constructor(private value?: T | null | undefined) {}

  /**
   * Creates an empty optional.
   */
  public static empty<T>(): Optional<T> {
    return new Optional<T>(null)
  }

  /**
   * Creates an Optional from a non-null value.
   *
   * @param value The value to wrap
   * @return the created optional with the given value
   */
  public static of<T>(value: T): Optional<T> {
    if (isEmpty(value)) {
      throw new Error('value is not defined')
    }
    return new Optional<T>(value)
  }

  /**
   * Creates an Optional from a value that might be null.
   *
   * @param value The value to wrap
   * @return the created optional with the given value
   */
  public static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return new Optional<T>(value)
  }

  /**
   * Returns the value that is wrapped in the optional.
   *
   * @return The wrapped value
   * @throws Error if the optional is empty
   */
  public get(): T {
    if (this.value === null || this.value === undefined) {
      throw new Error('Optional is empty')
    }
    return this.value
  }

  /**
   * Checks if the optional contains a value. Opposite of {@link isPresent}
   */
  public isPresent(): boolean {
    return !this.isEmpty()
  }

  /**
   * Defines if the optional is empty. Opposite of {@link isPresent}
   */
  public isEmpty(): boolean {
    return isEmpty(this.value)
  }

  /**
   * Executes a consumer callback if the optional contains a value.
   *
   * @param consumer The callback to execute
   */
  public ifPresent(consumer: (value: T) => void): void {
    if (!isEmpty(this.value)) {
      consumer(this.value)
    }
  }

  /**
   * Executes one of the given callbacks.
   *
   * @param presentAction The callback to execute if the optional has a value
   * @param emptyAction The callback to execute if the optional is empty
   */
  public ifPresentOrElse(presentAction: (value: T) => void, emptyAction: () => void): void {
    if (!isEmpty(this.value)) {
      presentAction(this.value)
    } else {
      emptyAction()
    }
  }

  /**
   * Checks the value in the optional for a certain condition. Will be skipped if the optional is empty.
   *
   * @param predicate The predicate that checks if the optional value should be passed
   * @return The optional itself if the predicate is true. Returns an empty optional if the predicate is false or the optional is empty.
   */
  public filter(predicate: (value: T) => boolean): Optional<T> {
    return isEmpty(this.value) || !predicate(this.value) ? Optional.empty() : this
  }

  /**
   * Maps the optional value to something else. Will be skipped if the optional is empty.
   *
   * @param mapper The mapper function that transforms the optional value
   * @return An optional that contains the mapped value or is empty if the map returned a nullish value
   */
  public map<U>(mapper: (value: T) => U | undefined | null): Optional<U> {
    return isEmpty(this.value) ? Optional.empty<U>() : Optional.ofNullable<U>(mapper(this.value))
  }

  /**
   * Maps the optional value to another optional. Will be skipped if the optional is empty.
   *
   * @param mapper The mapper function that transforms the value into another optional
   * @return An optional that is produced by the mapper function or an empty optional if no value is present.
   */
  public flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
    return isEmpty(this.value) ? Optional.empty() : mapper(this.value)
  }

  /**
   * Returns the value of the optional or the given value if the optional is empty.
   *
   * @param other The value to return if the optional is empty
   * @return The value from the optional or the alternative value
   */
  public orElse<U>(other: U): U | T {
    return isEmpty(this.value) ? other : this.value
  }

  /**
   * Returns the value of the optional or the value of the given supplier if the optional is empty.
   *
   * @param supplier The supplier that generates an alternative value if the optional is empty
   * @return The value from the optional or the alternative value
   */
  public orElseGet<U>(supplier: () => U): U | T {
    return isEmpty(this.value) ? supplier() : this.value
  }

  /**
   * Returns the value of the optional or throws an error if the optional is empty.
   *
   * @param exceptionSupplier The supplier that generates an error if the optional is empty
   * @return The value from the optional
   */
  public orElseThrow(exceptionSupplier: () => Error): T {
    if (isEmpty(this.value)) {
      throw exceptionSupplier()
    }
    return this.value
  }

  /**
   * If the current optional is empty then another optional is generated and returned.
   *
   * @param optionalSupplier A supplier callback that generates an alternative optional
   * @return The current optional or the generated optional if the current one is empty
   */
  public or<U>(optionalSupplier: () => Optional<U>): Optional<T | U> {
    return this.isEmpty() ? optionalSupplier() : this
  }

  /**
   * Throws an exception if the current value of the optional is empty.
   *
   * @param exceptionSupplier The supplier that generates an error if the optional is empty
   * @return The current optional if the value is not empty
   */
  public throwIfEmpty(exceptionSupplier: () => Error): Optional<T> {
    if (isEmpty(this.value)) {
      throw exceptionSupplier()
    }
    return this
  }
}

/**
 * Checks if the given value is null or undefined.
 *
 * @param value The value to check
 * @return is {@code true} if the value is null or undefined
 */
function isEmpty<T>(value: T | null | undefined): value is null | undefined {
  return value === undefined || value === null
}
