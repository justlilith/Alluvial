import p5 from "p5";
import { AlluvialNode } from "./node";

interface NodeCollection {
    node: AlluvialNode | null
}

let blankNode = null

let activeNode: NodeCollection = { node: blankNode };

export {
    activeNode
}