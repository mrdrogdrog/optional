/*
 * SPDX-FileCopyrightText: 2022 Tilman Vatteroth
 *
 * SPDX-License-Identifier: MIT
 */

import { Optional } from './index'
import { describe, expect, it } from '@jest/globals'

describe('Optional', () => {
  it('can wrap and unwrap a value', () => {
    const optional = Optional.of('test')
    const nullableOptional = Optional.ofNullable('test')

    expect(optional.get()).toBe('test')
    expect(nullableOptional.get()).toBe('test')
    expect(optional.isEmpty()).toBeFalsy()
    expect(nullableOptional.isEmpty()).toBeFalsy()
  })

  it("will crash if 'of' is used with empty value", () => {
    expect(() => Optional.of<null>(null)).toThrow()
  })

  it('can create an empty optional', () => {
    const emptyOptional = Optional.empty()
    const nullableOptional = Optional.ofNullable(null)

    expect(emptyOptional.isEmpty()).toBeTruthy()
    expect(() => emptyOptional.get()).toThrow()
    expect(nullableOptional.isEmpty()).toBeTruthy()
    expect(() => nullableOptional.get()).toThrow()
  })

  it('can detect empty and present', () => {
    const emptyOptional = Optional.empty()
    expect(emptyOptional.isEmpty()).toBeTruthy()
    expect(emptyOptional.isPresent()).toBeFalsy()

    const filledOptional = Optional.of('a')
    expect(filledOptional.isEmpty()).toBeFalsy()
    expect(filledOptional.isPresent()).toBeTruthy()
  })

  it('can run a simple action if value is present', () => {
    const p = new Promise((resolve, reject) => {
      Optional.of('test').ifPresent(resolve)
      reject()
    })
    return expect(p).resolves.not.toThrow()
  })

  it("doesn't run a simple action if value is missing", () => {
    const p = new Promise<void>((resolve, reject) => {
      Optional.empty().ifPresent(reject)
      resolve()
    })
    return expect(p).resolves.not.toThrow()
  })

  it('can run a branch action if value is present', () => {
    const p = new Promise<unknown>((resolve, reject) => {
      Optional.of('test').ifPresentOrElse(resolve, reject)
    })
    return expect(p).resolves.not.toThrow()
  })

  it('can run a branch action if value is empty', () => {
    const p = new Promise<void>((resolve, reject) => {
      Optional.empty().ifPresentOrElse(reject, resolve)
    })
    return expect(p).resolves.not.toThrow()
  })

  it('can filter values to keep', () => {
    const result = Optional.ofNullable('a')
      .filter((value) => value === 'a')
      .isPresent()
    expect(result).toBeTruthy()
  })

  it('can filter values to drop', () => {
    const result = Optional.ofNullable('a')
      .filter((value) => value !== 'a')
      .isPresent()
    expect(result).toBeFalsy()
  })

  it('can map values', () => {
    const result = Optional.ofNullable(1)
      .map((value) => value + 1)
      .get()
    expect(result).toBe(2)
  })

  it("doesn't map empty values", () => {
    const result = Optional.ofNullable(1)
      .filter((value) => value > 10)
      .map((value) => value + 1)
      .isEmpty()
    expect(result).toBeTruthy()
  })

  it('can flat map values', () => {
    const result = Optional.ofNullable(1)
      .flatMap((value) => Optional.of(value + 1))
      .get()
    expect(result).toBe(2)
  })

  it("doesn't flat map empty values", () => {
    const result = Optional.ofNullable(1)
      .filter((value) => value > 10)
      .flatMap((value) => Optional.of(value + 1))
      .isEmpty()
    expect(result).toBeTruthy()
  })

  it('can fallback to a value if optional is empty', () => {
    const result = Optional.empty().orElse('a')
    expect(result).toBe('a')
  })

  it("doesn't fallback to a value if optional has value", () => {
    const result = Optional.of('a').orElse(1)
    expect(result).toBe('a')
  })

  it('can fallback to a value if optional is empty using a supplier', () => {
    const result = Optional.empty().orElseGet(() => 'a')
    expect(result).toBe('a')
  })

  it("doesn't fallback to a value if optional has value using a supplier", () => {
    const result = Optional.of('a').orElseGet(() => 1)
    expect(result).toBe('a')
  })

  it('can throw a fallback error if optional is empty', () => {
    const result = () => Optional.empty().orElseThrow(() => new Error())
    expect(result).toThrow()
  })

  it("won't throw a fallback error if optional has value", () => {
    const result = Optional.ofNullable(1).orElseThrow(() => new Error())
    expect(result).toBe(1)
  })

  it('can replace an empty optional with another optional', () => {
    const result = Optional.empty()
      .or(() => Optional.of(1))
      .get()
    expect(result).toBe(1)
  })

  it("won't replace a non-empty optional with another optional", () => {
    const result = Optional.of(1)
      .or(() => Optional.of(2))
      .get()
    expect(result).toBe(1)
  })

  it('will throw an error if optional is empty in orThrow', () => {
    const result = () =>
      Optional.empty()
        .orThrow(() => new Error('optional is empty'))
        .get()
    expect(result).toThrow('optional is empty')
  })

  it("won't throw an error if optional is non-empty in orThrow", () => {
    const result = Optional.of(1)
      .orThrow(() => new Error())
      .get()
    expect(result).toBe(1)
  })

  it("will throw an error if the guard-condition isn't fulfilled", () => {
    const result = () =>
      Optional.of(1)
        .guard(
          (value) => value > 1,
          () => new Error('value is not more than 1')
        )
        .get()
    expect(result).toThrow('value is not more than 1')
  })

  it("won't throw an error if the guard-condition is fulfilled", () => {
    const result = Optional.of(1)
      .guard(
        (value) => value < 2,
        () => new Error('value is not less than 2')
      )
      .get()
    expect(result).toBe(1)
  })
})
