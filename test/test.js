import { parser } from "../dist/index.js"

console.log(parser.parse(
`
Word

Section
  Subsection
    # Comment
    Content
    More # Comment 2

  Etc
`
))