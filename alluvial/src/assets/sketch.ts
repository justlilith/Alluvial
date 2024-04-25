"use strict";
"use client";

import { AlluvialNode } from "./node";
import { AlluvialContextMenu } from "./contextMenu";
import { activeNode } from "./constants";

const p5sketch = {
  nodeList: new Array<AlluvialNode>(),
  function: (p: any) => { }
}
p5sketch.nodeList = [];

p5sketch.function = function (p) {
  let node12;
  let node2;
  let node3;
  let node4;
  let nodeFinal;
  let nodeFinal2;
  let add;
  let divide;
  let links = [];
  let contextMenu = new AlluvialContextMenu({ p })

  p.setup = () => {
    console.log(p)
    p.frameRate(60);
    p.loop()
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(20);
    contextMenu.displayMenu = false;

    canvas.mouseClicked(event => console.log(event))

    node12 = new AlluvialNode({
      p,
      name: "node12",
      type: "data",
      color: "green",
      data: "1",
      x: 50,
      y: 600,
    });
    node3 = new AlluvialNode({
      p,
      name: "node3",
      type: "data",
      color: "green",
      data: "3",
      x: 25,
      y: 25,
      outputs: [add],
    });
    node4 = new AlluvialNode({
      p,
      name: "node4",
      type: "data",
      color: "green",
      data: "4",
      x: 25,
      y: 125,
      outputs: [add],
    });
    node2 = new AlluvialNode({
      p,
      name: "node2",
      type: "data",
      color: "green",
      data: "2",
      x: 25,
      y: 325,
      outputs: [divide],
    });
    add = new AlluvialNode({
      p,
      name: "add",
      type: "function",
      color: "brown",
      data: `add()`,
      x: 400,
      y: 300,
      inputs: [node3, node4],
    });
    divide = new AlluvialNode({
      p,
      name: "divide",
      type: "function",
      color: "blue",
      data: `divide()`,
      x: 400,
      y: 500,
      outputs: [nodeFinal],
      inputs: [node2, add, node12],
    });
    nodeFinal = new AlluvialNode({
      p,
      name: "nodeFinal",
      type: "result",
      color: "mauve",
      x: 800,
      y: 600,
      inputs: [divide],
    });
    nodeFinal2 = new AlluvialNode({
      p,
      name: "nodeFinal2",
      type: "result",
      color: "violet",
      x: 800,
      y: 400,
      inputs: [add],
    });

    p5sketch.nodeList.push(divide);
    p5sketch.nodeList.push(node3);
    p5sketch.nodeList.push(node12);
    p5sketch.nodeList.push(node4);
    p5sketch.nodeList.push(node2);
    p5sketch.nodeList.push(add);
    p5sketch.nodeList.push(nodeFinal);
    p5sketch.nodeList.push(nodeFinal2);
    // test2.frame.mouseClicked(logit)
    // noLoop()
    console.log(p5sketch.nodeList);
  }

  p.draw = () => {
    // p.background(20);
    p.clear()
    p5sketch.nodeList.forEach((node) => {
      node.update();
      node.display();
      if (node.inputs) {
        node.inputs.map((link) => {
          p.stroke(255);
          p.strokeWeight(2);
          p.noFill();
          // line(...node.in, ...link.out);
          let linkLine = p.bezier(...node.in, node.in[0] - 50, node.in[1], link.out[0] + 50, link.out[1], ...link.out);
          let constant = 2;

          for (let i = 0; i < constant; i++) {
            let x = p.bezierPoint(node.in[0], node.in[0] - 50, link.out[0] + 50, link.out[0], i / constant);
            let y = p.bezierPoint(node.in[1], node.in[1], link.out[1], link.out[1], i / constant);
            let id = `${node.name}-${link.name}`;
            // console.log(id)

            if (i != 0) {
              if (document.getElementById(id)) {
                let clickable = [...node.linkLines.list]?.filter((child) => {
                  return child.id() == id;
                })[0];
                clickable?.position(x - 7.5, y - 7.5);
                // console.log(clickable)
              } else {
                let clickable = p.createDiv();
                clickable.mousePressed = (event) => {
                  if (!activeNode) {
                    console.log(event);
                    node.inputs = node.inputs.filter((input) => {
                      return input != link;
                    });
                    clickable.remove();
                    node.linkLines.list = node.linkLines.list.filter((object) => {
                      return object.id() != id;
                    });
                    // console.log(node.frame.linkLines.list)
                  }
                }
                clickable.id(id);
                clickable.position(x - 7.5, y - 7.5);
                clickable.size(15, 15);
                clickable.style(` border:thin solid grey; border-radius:100%; font-size:1em;color:red;font-family:'Fira Code', sans-serif;cursor:pointer`);
                node.linkLines.list.push(clickable);
                // node.frame.linkLines.list.forEach((child) => {
                //   // child.remove();
                //   node.frame.linkLines.child(child);
                // });
              }
            }
          }
        });
      }
    });
    orchestrate();
  }

  function orchestrate() {
    if (activeNode != null) {
      activeNode?.node ? p.line(...activeNode?.node.out, p.mouseX, p.mouseY) : null;
    }
    if (contextMenu.displayMenu == true) {
      contextMenu.display();
    }
  }

  p.mouseClicked = (event) => {
    if (event.target.classList.contains("p5Canvas")) {
      activeNode.node = null;
      p5sketch.nodeList = p5sketch.nodeList.map((node) => {
        // return { ...node, frame: { ...frame, clickHeld: false } };
        node.clickHeld = false;
        return node;
      });
    }
  }

  p.mousePressed = (event) => {
    if (event.buttons == 2 && event.target.classList.contains("p5Canvas")) {
      // event.preventDefault();
      // console.log(event);
      // console.log("💙");
      showContextMenu(event);
    }
    if (event.buttons == 1 && event.target.classList.contains("p5Canvas")) {
      // console.log("💙");

      hideContextMenu();
    }
  }

  function removeLink(args) {
    // args.from, args.to == nodes
    // console.log(args)
    args.from.inputs = args.from.inputs.filter((node) => {
      return node != args.to;
    });
  }

  function showContextMenu(event) {
    console.log(p.mouseX)
    contextMenu.frame.style("display", "block");
    contextMenu.frame.position(p.mouseX, p.mouseY);
    contextMenu.displayMenu = true;
  }

  function hideContextMenu() {
    contextMenu.displayMenu = false;
    contextMenu.frame.style("display", "none");
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}

// const my = new p5(p5sketch.function, 'p5Canvas');

export {
  p5sketch
}