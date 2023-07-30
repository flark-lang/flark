import { parser } from "./flark.grammar"

const indent = text => text.split("\n").map(line => "    " + line).join("\n")

class Tag {
    constructor(name, class_) {
        this.name = name
        this.class_ = class_
        this.children = []
        this.parent = null
    }
    addChild(child) {
        this.children.push(child)
        if (typeof child != "string") child.parent = this
        return this
    }
    addAsChildOf(parent) {
        parent.addChild(this)
        this.parent = parent
        return this
    }
    render() {
        let result = `<${this.name}`
        if (this.class_) {
            result += ` class="${this.class_.join(" ")}"`
        }
        result += ">\n"
        for (let child of this.children) {
            if (typeof child == "string") {
                result += indent(child) + "\n"
            } else {
                result += indent(child.render()) + "\n"
            }
        }
        result += `</${this.name}>`
        return result
    }
}

export function toHtml(text) {
    const tree = parser.parse(text)

    const doc = new Tag("div", [])
    let current = doc
    
    tree.iterate({
        enter(node) {
            if (["VPipe", "HPipe"].includes(node.name)) return false
            if (node.name == "Item") {
                current = new Tag("div", ["flark-item"]).addAsChildOf(current)
            }
            if (node.name == "VBox") {
                current = new Tag("div", ["flark-vbox"]).addAsChildOf(current)
            }
            if (node.name == "HBox") {
                current = new Tag("div", ["flark-hbox"]).addAsChildOf(current)
            }
            if (node.name == "PlainText") {
                new Tag("div", ["flark-text"])
                    .addChild(text.slice(node.from, node.to))
                    .addAsChildOf(current)
                return false
            }
            return true
        },
        leave(node) {
            if ([
                "Item",
                "VBox",
                "HBox",
            ].includes(node.name)) {
                current = current.parent
            }
            return true
        }
    })
    return doc.render()
}