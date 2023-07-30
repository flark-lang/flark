import { toHtml } from "../dist/index.js"

const text =
`|
    - a
    - b
|
    | b
    | c`

console.log(toHtml(text))