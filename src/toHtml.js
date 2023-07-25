import { parser } from "./flark.grammar"

export function toHtml(text) {
    const tree = parser.parse(text)

    let depth = 0
    let result = ""
    const push = str => result += "    ".repeat(depth) + str + "\n"
    
    tree.iterate({
        enter(node) {
            if (["VPipe", "HPipe"].includes(node.name)) return false
            if (node.name == "VBox") {
                push(`<div style="display: flex; flex-direction: column">`)
                depth += 1
            }
            if (node.name == "HBox") {
                push(`<div style="display: flex; flex-direction: row">`)
                depth += 1
            }
            if (node.name == "String") {
                push(`<div>`)
                push(`    ${text.slice(node.from, node.to)}`)
                push(`</div>`)
                return false
            }
            return true
        },
        leave(node) {
            if (node.name == "VBox") {
                depth -= 1
                push(`</div>`)
            }
            if (node.name == "HBox") {
                depth -= 1
                push(`</div>`)
            }
            return true
        }
    })
    return result
}