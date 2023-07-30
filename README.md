<!--
SPDX-FileCopyrightText: 2023 Tilman Vatteroth

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Optional

This library provides java-like optionals to filter, map and process values depending on if they're present or not.
I created this lib because I like functional programming think that Optionals are a good way to clean up code.
Yes, I know that typescript has the optional operator (`?`) but sometimes this isn't enough, like when I want to filter values or fail instantly if a value is empty.

## How to use

Install it with yarn or npm using `yarn add @mrdrogdrog/optional` or `npm i @mrdrogdrog/optional`.

## API

In addition to the [traditional java-like optional functions](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) I added some more useful functions like
[isEmpty](https://github.com/mrdrogdrog/optional/blob/main/docs/Optional.md#isempty), [orThrow](https://github.com/mrdrogdrog/optional/blob/main/docs/Optional.md#orthrow) and [guard](https://github.com/mrdrogdrog/optional/blob/main/docs/Optional.md#guard).
Check the [docs](https://github.com/mrdrogdrog/optional/tree/main/docs) folder for the whole API.

## Build
You can build this lib by running `yarn build`.
Run tests with `yarn test`.
To check the code style use `yarn lint`.

## Contributions

I welcome contributions!
Have a look at the [contribution docs](CONTRIBUTING.md) to find out how you can help.

# License

Licensed under MIT. For our list of contributors, see [AUTHORS](AUTHORS).
