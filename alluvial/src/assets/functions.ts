import { AlluvialNode } from "./node";
import { p5sketch } from "./sketch";
import { activeNode } from "./constants";
import p5 from "p5";
import { p5InstanceExtensions } from "p5";
import { AlluvialContextMenu } from "./contextMenu";

function createNode(args) {
    let tempName = "a" + Date.now();
    console.log(tempName);
    window.globalThis.swap = new AlluvialNode({ p: args.p, name: tempName, type: args.type })
    Function(`
    "use strict";
    window.${tempName} = window.swap;
    p5sketch.nodeList.push(window.${tempName});
    console.log(p5sketch.nodeList)
    `)();
}

function deleteNode(args) {
    args.node.frame.remove();
    setTimeout(() => {
        // console.log(p5sketch.nodeList.map(node => node.frame.linkLines.child()))
        p5sketch.nodeList.map((node) => {
            [...node.linkLines.list].forEach((elt) => elt.remove());
            node.inputs = node.inputs.filter((input) => input.name != args.node.name);
        });
        p5sketch.nodeList = p5sketch.nodeList.filter((node) => node.name != args.node.name);
    }, 50);
    // console.log(p5sketch.nodeList.length);
}

function renameNode(node, newName) {
    // let newNode = JSON.parse(JSON.stringify(node))
    Function(`
    "use strict";
    //let oldName = "${node.name}"
    //console.log(oldName)
    window.${newName} = ${node.name}
    window.${newName}.name = "${newName}"
    //p5sketch.nodeList = p5sketch.nodeList.filter((node) => node.name != oldName)
    //p5sketch.nodeList.push(${newName})
    //console.log(${newName}.name)
    //return ${newName}
    `)();
    // console.log(p5sketch.nodeList.map((node) => node.name));
}

function addNodes(nodes) {
    // console.log(nodes)
    try {
        let res = nodes
            .map((node) => node.dataOut)
            .reduce((pv, cv) => {
                return pv + cv;
            }, 0);
        return res;
    } catch (e) {
        console.log(e);
    }
}

function divideNodes(nodes) {
    // console.log(nodes)
    // console.log(nodes[0].dataOut / nodes[1].dataOut);
    // return nodes[0].dataOut / nodes[1].dataOut;
    let res = nodes
        .map((node) => node.dataOut)
        .reduce((previousNode, activeNode) => {
            return previousNode / activeNode;
        }, 1);
    // console.log(nodes)
    return res;
}

function multiplyNodes(nodes) {
    // console.log(nodes)
    // console.log(nodes[0].dataOut / nodes[1].dataOut);
    // return nodes[0].dataOut / nodes[1].dataOut;
    let res = nodes
        .map((node) => node.dataOut)
        .reduce((previousNode, activeNode) => {
            return previousNode * activeNode;
        }, 1);
    // console.log(nodes)
    return res;
}

function subtractNodes(nodes) {
    // console.log(nodes)
    // console.log(nodes[0].dataOut / nodes[1].dataOut);
    // return nodes[0].dataOut / nodes[1].dataOut;
    let res = nodes
        .map((node) => node.dataOut)
        .reduce((previousNode, activeNode) => {
            return previousNode - activeNode;
        }, 0);
    // console.log(nodes)
    return res;
}

function addTextInput(p: p5InstanceExtensions, node: AlluvialNode) {
    let textInput = p.createInput("textarea", `${node.dataOut}`);
    node.textInput = textInput;
    textInput.position(18, 24);
    textInput.style(`padding:0px; border:thin solid grey;background:black; color:white;font-size:1.2em;font-family:'Fira Code', sans-serif`);
    textInput.size(180, 22);
    node.dataOut = Number(textInput.value()) * 1;
    node.body.child(textInput);
}

function addLink(node) {
    if (activeNode.node) {
        // if (activeNode.outputs.includes(node) == false) {
        // activeNode.outputs = [...activeNode.outputs, node];
        // }
        if (node.inputs.includes(activeNode) == false) {
            node.inputs = [...node.inputs, activeNode];
        }
        activeNode.node = new AlluvialNode({});
    } else {
        activeNode.node = node;
    }
}

export {
    addLink,
    createNode,
    deleteNode,
    renameNode,
    addTextInput,
    addNodes,
    divideNodes,
    multiplyNodes,
    subtractNodes,
}