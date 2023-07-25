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
                push(`<div class="flark-vbox">`)
                depth += 1
            }
            if (node.name == "HBox") {
                push(`<div class="flark-hbox">`)
                depth += 1
            }
            if (node.name == "String") {
                push(`<div class="flark-text">`)
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