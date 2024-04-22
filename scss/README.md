# Experiment exporting scss

## Copyright Paul Kirkaas (pkirkaas@gmail.com): 22-Apr-2024 22:38

This actually works to export from package.json:
```json
  "exports": {
    "./scss/pk-default": "./scss/pk-default.scss",
  ```

  In implementing app styles.scss:

  ```scss
@import "pk-ts-fe-lib/scss/pk-default";
  ```