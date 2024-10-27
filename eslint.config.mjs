import path from "node:path";
import { fileURLToPath } from "node:url";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslint.configs.recommended,
    allConfig: eslint.configs.all
});

const config = [...compat.extends("next/core-web-vitals"), {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {},
}]

const configArray = [
    ...fixupConfigRules(config),
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    { ignores: [".next/*"] },
]

export default configArray;