---
"@sngn/eslint-plugin-split-and-sort-imports": minor
---

Changed (fixed) the sorting methodology to sort like (default) sort-imports.  
Used to sort "aA" after "aa". Now capital letters are sorted before lowercase ones.  
This also removes configuration options that start with `localeCompare_`.
