import { styleTags, tags as t } from "@lezer/highlight"

export const flarkHighlighting = styleTags({
    PlainText: t.content,
    "VPipe HPipe": t.operator,
    "LBrace RBrace": t.brace,
    "LBracket RBracket": t.squareBracket,
    Number: t.number,
    Identifier: t.name,
    Dot: t.operator,
})