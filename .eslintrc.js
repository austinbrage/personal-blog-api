module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint",
        "jest"
    ],
    "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off"
    }
}
