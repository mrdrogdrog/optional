<!--
SPDX-FileCopyrightText: 2023 Tilman Vatteroth

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Class: Optional<T\>

A container object that wraps possibly undefined values.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](Optional.md#constructor)

### Methods

- [filter](Optional.md#filter)
- [flatMap](Optional.md#flatmap)
- [get](Optional.md#get)
- [guard](Optional.md#guard)
- [ifPresent](Optional.md#ifpresent)
- [ifPresentOrElse](Optional.md#ifpresentorelse)
- [isEmpty](Optional.md#isempty)
- [isPresent](Optional.md#ispresent)
- [map](Optional.md#map)
- [or](Optional.md#or)
- [orElse](Optional.md#orelse)
- [orElseGet](Optional.md#orelseget)
- [orElseThrow](Optional.md#orelsethrow)
- [orThrow](Optional.md#orthrow)
- [empty](Optional.md#empty)
- [of](Optional.md#of)
- [ofNullable](Optional.md#ofnullable)
- [wrapInArray](Optional.md#wrapinarray)

## Constructors

### constructor

• `Private` **new Optional**<`T`\>(`value?`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | ``null`` \| `T` |

#### Defined in

[index.ts:11](https://github.com/mrdrogdrog/optional/blob/2cddda4/src/index.ts#L11)

## Methods

### filter

▸ **filter**(`predicate`): [`Optional`](Optional.md)<`T`\>

Checks the value in the optional for a certain condition. Will be skipped if the optional is empty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `T`) => `boolean` | The predicate that checks if the optional value should be passed |

#### Returns

[`Optional`](Optional.md)<`T`\>

The optional itself if the predicate is true. Returns an empty optional if the predicate is false or the optional is empty.

___

### flatMap

▸ **flatMap**<`U`\>(`mapper`): [`Optional`](Optional.md)<`U`\>

Maps the optional value to another optional. Will be skipped if the optional is empty.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | (`value`: `T`) => [`Optional`](Optional.md)<`U`\> | The mapper function that transforms the value into another optional |

#### Returns

[`Optional`](Optional.md)<`U`\>

An optional that is produced by the mapper function or an empty optional if no value is present.

___

### get

▸ **get**(): `T`

Returns the value that is wrapped in the optional.

**`throws`** Error if the optional is empty

#### Returns

`T`

The wrapped value

___

### guard

▸ **guard**(`predicate`, `exceptionSupplier`): [`Optional`](Optional.md)<`T`\>

Checks for the given condition and throws an exception if the condition fails.

**`throws`** Error if the condition isn't met.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `T`) => `boolean` | The condition that needs to be fulfilled to go on |
| `exceptionSupplier` | () => `Error` | A supplier that generates an {@link Error} if the condition fails |

#### Returns

[`Optional`](Optional.md)<`T`\>

The current optional if the condition is fulfilled

___

### ifPresent

▸ **ifPresent**(`consumer`): `void`

Executes a consumer callback if the optional contains a value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumer` | (`value`: `T`) => `void` | The callback to execute |

#### Returns

`void`

___

### ifPresentOrElse

▸ **ifPresentOrElse**(`presentAction`, `emptyAction`): `void`

Executes one of the given callbacks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `presentAction` | (`value`: `T`) => `void` | The callback to execute if the optional has a value |
| `emptyAction` | () => `void` | The callback to execute if the optional is empty |

#### Returns

`void`

___

### isEmpty

▸ **isEmpty**(): `boolean`

Defines if the optional is empty. Opposite of [isPresent](Optional.md#ispresent)

#### Returns

`boolean`

___

### isPresent

▸ **isPresent**(): `boolean`

Checks if the optional contains a value. Opposite of [isPresent](Optional.md#ispresent)

#### Returns

`boolean`

___

### map

▸ **map**<`U`\>(`mapper`): [`Optional`](Optional.md)<`U`\>

Maps the optional value to something else. Will be skipped if the optional is empty.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | (`value`: `T`) => `undefined` \| ``null`` \| `U` | The mapper function that transforms the optional value |

#### Returns

[`Optional`](Optional.md)<`U`\>

An optional that contains the mapped value or is empty if the map returned a nullish value

___

### or

▸ **or**<`U`\>(`optionalSupplier`): [`Optional`](Optional.md)<`T` \| `U`\>

If the current optional is empty then another optional is generated and returned.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `optionalSupplier` | () => [`Optional`](Optional.md)<`U`\> | A supplier callback that generates an alternative optional |

#### Returns

[`Optional`](Optional.md)<`T` \| `U`\>

The current optional or the generated optional if the current one is empty

___

### orElse

▸ **orElse**<`U`\>(`other`): `T` \| `U`

Returns the value of the optional or the given value if the optional is empty.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | `U` | The value to return if the optional is empty |

#### Returns

`T` \| `U`

The value from the optional or the alternative value

___

### orElseGet

▸ **orElseGet**<`U`\>(`supplier`): `T` \| `U`

Returns the value of the optional or the value of the given supplier if the optional is empty.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `supplier` | () => `U` | The supplier that generates an alternative value if the optional is empty |

#### Returns

`T` \| `U`

The value from the optional or the alternative value

___

### orElseThrow

▸ **orElseThrow**(`exceptionSupplier`): `T`

Returns the value of the optional or throws an error if the optional is empty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exceptionSupplier` | () => `Error` | The supplier that generates an error if the optional is empty |

#### Returns

`T`

The value from the optional

___

### orThrow

▸ **orThrow**(`exceptionSupplier`): [`Optional`](Optional.md)<`T`\>

Throws an exception if the current value of the optional is empty.

**`throws`** Error if the optional is empty

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exceptionSupplier` | () => `Error` | The supplier that generates an error if the optional is empty |

#### Returns

[`Optional`](Optional.md)<`T`\>

The current optional if the value is not empty

___

### wrapInArray

▸ **wrapInArray**(): [`T`] \| []

Returns the value of the optional wrapped in an array.
If the optional is empty then the array will be empty too.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`T`] \| []

An array that is either empty or contains the value

___

### empty

▸ `Static` **empty**<`T`\>(): [`Optional`](Optional.md)<`T`\>

Creates an empty optional.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`Optional`](Optional.md)<`T`\>

___

### of

▸ `Static` **of**<`T`\>(`value`): [`Optional`](Optional.md)<`T`\>

Creates an Optional from a non-null value.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to wrap |

#### Returns

[`Optional`](Optional.md)<`T`\>

the created optional with the given value

___

### ofNullable

▸ `Static` **ofNullable**<`T`\>(`value`): [`Optional`](Optional.md)<`T`\>

Creates an Optional from a value that might be null.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| ``null`` \| `T` | The value to wrap |

#### Returns

[`Optional`](Optional.md)<`T`\>

the created optional with the given value
