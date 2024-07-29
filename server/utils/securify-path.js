import path from "path";

export default function securifyPath(...parts) {
    return path.join(...parts.map(p =>
        p.replace("/", "")
            .replace("\\", "")
            .replace(".", ""))
    )
}