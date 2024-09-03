import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist", "**/node_modules"],
}, ...compat.extends(), {
    plugins: {
        "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "commonjs",
    },

    settings: {
        ignore: ["node_modules", "dist"],
    },

    rules: {
        "space-before-function-paren": 0,
        "no-throw-literal": 0,
        "prefer-promise-reject-errors": 0,
        "dot-notation": 0,
        "prefer-const": 0,
        "no-console": 1,
        quotes: 0,
        "array-callback-return": 0,
        eqeqeq: 0,
        "no-unneeded-ternary": 0,
        indent: 0,
        "no-useless-constructor": 0,
        "no-sparse-arrays": 0,
        "no-prototype-builtins": 0,
        "mocha/no-hooks-for-single-case": 0,
        "quote-props": 0,
        "chai-friendly/no-unused-expressions": 0,
        "no-async-promise-executor": 0,
        curly: 0,
        "no-new": 0,
        "node/no-callback-literal": 0,
    },
}];