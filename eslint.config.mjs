import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: ['src/generated/prisma/**/*'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Turn this off if Tailwind UI class names trip the rule
      'tailwindcss/no-custom-classname': 'off',
      // "tailwindcss/classnames-order": "warn",  // example override
    },
  },
];
