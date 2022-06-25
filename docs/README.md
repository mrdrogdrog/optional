@mrdrogdrog/optional / [Exports](modules.md)

<!--
SPDX-FileCopyrightText: 2022 Tilman Vatteroth

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Optional

This library provides java-like optionals to filter, map and process values depending on if they're present or not.
I created this lib because I like functional programming think that Optionals are a good way to clean up code.
Yes, I know that typescript has the optional operator (`?`) but sometimes this isn't enough, like when I want to filter values or fail instantly if a value is empty.

## How to use

Install it with yarn or npm using `yarn add @mrdrogdrog/optional` or `npm i @mrdrogdrog/optional`.

## API

In addition to the [traditional java-like optional functions](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) I added some more like

### `Optional.isEmpty()`
The opposite of `isPresent`

### `Optional.orThrow(() => new Error())`
Throws an error

## Build
You can build this lib by running `yarn build`.
To build a publishable build you'll need [`mmv`](https://wiki.ubuntuusers.de/mmv/)

## Contributions

We welcome contributions!
Have a look at our [contribution docs](CONTRIBUTING.md) to find out how you can help.

# License

Licensed under MIT. For our list of contributors, see [AUTHORS](AUTHORS).
