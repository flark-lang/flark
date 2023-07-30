export const styleParse = (...atoms) => {
    const [head, ...tail] = atoms
    const result = {}
    if (head == "text") {
        tail.forEach(atom => {
            if (Number.isFinite(Number(atom))) {
                result["font-size"] = atom + "px"
            }
        })
    }
    if (head == "bg") {
        tail.forEach(atom => {
            result["background-color"] = atom
        })
    }
    return result
}