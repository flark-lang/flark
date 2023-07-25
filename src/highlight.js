import { styleTags, tags as t } from "@lezer/highlight"

export const flarkHighlighting = styleTags({
    String: t.content,
    "VPipe HPipe": t.operator,
})