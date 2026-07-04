import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Reading persisted theme/role from localStorage and setting mounted /
      // animation state on mount are intentional, hydration-safe patterns here.
      // This React-compiler-oriented rule flags them as false positives.
      "react-hooks/set-state-in-effect": "off",
      // Apostrophes and quotes appear throughout the reverent prose copy; they
      // render correctly and don't warrant HTML entity escaping.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
