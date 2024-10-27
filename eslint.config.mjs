import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

const config = [
    {
        // files: ["**/*.{js,mjs,cjs,ts}"],
        ignores: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    },
    {languageOptions: { globals: {...globals.browser, ...globals.node} }},
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        rules: {
            'react/prop-types': [
                'error',
                {
                    ignore: ['className', 'src/*'], 
                },
            ],
            "react/jsx-uses-react": "off",
            "no-unused-vars": "off",
            "no-explicit-any": "off",
            "no-unsafe-function-type": "off",
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
];

export default config;