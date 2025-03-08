/*
 * SPDX-FileCopyrightText: 2020 Tilman Vatteroth
 *
 * SPDX-License-Identifier: CC0-1.0
 */

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
)
