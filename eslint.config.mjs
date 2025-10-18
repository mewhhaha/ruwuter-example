import ts from "typescript-eslint";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import oxlint from "eslint-plugin-oxlint";

const tailwindcss = {
  plugins: {
    "better-tailwindcss": eslintPluginBetterTailwindcss,
  },
  rules: {
    ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
    "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
    "better-tailwindcss/enforce-consistent-important-position": "warn",
    "better-tailwindcss/enforce-shorthand-classes": "warn",
    "better-tailwindcss/no-deprecated-classes": "error",
    "better-tailwindcss/no-conflicting-classes": "error",
    "better-tailwindcss/no-restricted-classes": "error",
  },
};

export default ts.config(
  ts.configs.recommended,
  tailwindcss,
  oxlint.configs["flat/recommended"],
  {
    rules: {
      "react/jsx-key": "off",
    },
  },
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "/app/assets/tailwind.css",
      },
    },
  },
);
