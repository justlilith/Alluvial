"use strict";


document.oncontextmenu = (event) => {
  event.preventDefault();
};

let p5sketch = {}
p5sketch.nodeList = [];


p5sketch.function = function(p) {
  let node12;
  let node2;
  let node3;
  let node4;
  let nodeFinal;
  let nodeFinal2;
  let add;
  let divide;
  let links = [];
  
  let contextMenu;
  
  p.setup = () => {
    console.log(p)
    p.frameRate(60);
    p.loop()
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(20);
    contextMenu = new ContextMenu();
    contextMenu.displayMenu = false;

    // canvas.mouseClicked(event => console.log(event))
    
    node12 = new Node({
      name: "node12",
      type: "data",
      color: "green",
      data: "1",
      x: 50,
      y: 600,
    });
    node3 = new Node({
      name: "node3",
      type: "data",
      color: "green",
      data: "3",
      x: 25,
      y: 25,
      outputs: [add],
    });
    node4 = new Node({
      name: "node4",
      type: "data",
      color: "green",
      data: "4",
      x: 25,
      y: 125,
      outputs: [add],
    });
    node2 = new Node({
      name: "node2",
      type: "data",
      color: "green",
      data: "2",
      x: 25,
      y: 325,
      outputs: [divide],
    });
    add = new Node({
      name: "add",
      type: "function",
      color: "brown",
      data: `add()`,
      x: 400,
      y: 300,
      inputs: [node3, node4],
    });
    divide = new Node({
      name: "divide",
      type: "function",
      color: "blue",
      data: `divide()`,
      x: 400,
      y: 500,
      outputs: [nodeFinal],
      inputs: [node2, add, node12],
    });
    nodeFinal = new Node({
      name: "nodeFinal",
      type: "result",
      color: "mauve",
      x: 800,
      y: 600,
      inputs: [divide],
    });
    nodeFinal2 = new Node({
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
                let clickable = [...node.frame.linkLines.list].filter((child) => {
                  return child.id() == id;
                })[0];
                clickable.position(x - 7.5, y - 7.5);
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
                    node.frame.linkLines.list = node.frame.linkLines.list.filter((object) => {
                      return object.id() != id;
                    });
                    // console.log(node.frame.linkLines.list)
                  }
                }
                clickable.id(id);
                clickable.position(x - 7.5, y - 7.5);
                clickable.size(15, 15);
                clickable.style(` border:thin solid grey; border-radius:100%; font-size:1em;color:red;font-family:'Fira Code', sans-serif;cursor:pointer`);
                node.frame.linkLines.list.push(clickable);
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
  
  class Node {
    constructor(args) {
      this.name = args?.name || "node";
      this.x = args?.x ||  p.mouseX;
      this.y = args?.y ||  p.mouseY;
      this.outputs = args?.outputs || null;
      this.color = args?.color || `white`;
      this.type = args?.type || "data";
      this.copy = args?.copy || args?.data || null;
      this.input = args?.input || [];
      this.inputs = args?.inputs || [];
      this.dataOut = args?.data || "";
      
      this.out = [this.x + 224, this.y + 32];
      this.in = [this.x, this.y + 32];
      
      this.offset = { x: null, y: null };
      this.frame = p.createDiv();
      this.frame.class = "node";
      this.frame.id(this.name);
      this.frame.position(this.x, this.y);
      // this.frame.size(300, 64);
      this.frame.style("/* background:red;*/position:fixed;");
      this.frame.positionArgs = {
        x: this.x,
        y: this.y,
      };
      this.frame.clickHeld = false;
      
      this.inHandle = p.createDiv();
      this.inHandle.size(12, 64);
      this.inHandle.position(0, 0);
      this.inHandle.style(`background:${this.color};`);
      this.inHandle.style("border-radius", "0 0 0 6px");
      
      this.frame.child(this.inHandle);
      
      this.body = p.createDiv();
      this.body.size(200, 64);
      this.body.style(`background:hsla(0,0%,0%,0.8)`);
      this.body.position(12, 0);
      this.frame.child(this.body);
      
      this.topBar = p.createDiv();
      this.topBar.position(0);
      this.topBar.style(`display:flex; flex-direction:row; z-index:67; align-contents:center; width:100%`);
      this.frame.child(this.topBar);
      
      this.closeButton = p.createDiv("x");
      this.closeButton.size(12, 12);
      // this.closeButton.position(0, 0);
      this.closeButton.style(`user-select:none; text-align:center;z-index:66;font-size:.6em;font-family:'Fira Code',sans-serif;color:white; background:black; border: thin solid grey; border-style:inset; vertical-align:super;margin-right:6px;`);
      this.closeButton.mouseClicked((event) => {
        deleteNode({ node: this });
      })
      this.topBar.child(this.closeButton);
      
      this.label = p.createDiv(args?.name);
      this.label.style(`user-select:none; font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
      // this.label.position(18, 3);
      this.topBar.child(this.label);
      
      this.handle = p.createDiv("::::::::");
      this.handle.style(`text-align:center; flex-grow: 1; user-select:none; font-size:.8em;font-family:'Fira Code',sans-serif;color:hsl(0,0%,20%)`);
      // this.handle.position(18, 3);
      this.topBar.child(this.handle);
      
      this.total = p.createSpan(this?.dataOut);
      this.total.style(`user-select:none; text-align:right;z-index:66;font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
      this.total.position(200, -10);
      this.frame.child(this.total);
      
      this.outHandle = p.createDiv();
      this.outHandle.size(12, 64);
      this.outHandle.style(`background:grey`);
      this.outHandle.position(212, 0);
      this.outHandle.style("border-radius", "0 6px 6px 0");
      this.frame.child(this.outHandle);
      
      this.nameLabel = p.createSpan("Node name: ");
      this.nameLabel.position(0, 64);
      this.nameLabel.style(`user-select:none; position:relative; display:inline; background:black; text-align:left;z-index:66;font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
      this.frame.child(this.nameLabel);
      
      this.nameLabelInput = p.createInput(this?.name.toString());
      this.nameLabelInput.position(0, 64);
      this.nameLabelInput.size(120);
      this.nameLabelInput.style(`display:inline; position:relative; background:black; border: thin solid grey; text-align:left;z-index:66;font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
      this.nameLabelInput.input = (event) => {
        renameNode(this, this.nameLabelInput.value());
      }
      this.frame.child(this.nameLabelInput);
      
      this.frame.linkLines = p.createDiv();
      this.frame.linkLines.class("linkLine");
      this.frame.linkLines.list = [];
      
      switch (this.type) {
        case "function":
        addTextInput(this);
        break;
        case "data":
        addTextInput(this);
        this.dataOut = this.dataOut * 1;
        break;
        case "jsf":
        addTextInput(this);
        // this.inHandle.style(`background:white;`);
        this.frame.textInput.value(4);
        
        break;
        case "result":
        this.dataOut = this?.inputs?.[0]?.dataOut;
        this.result = p.createSpan(this.copy);
        this.result.style(`font-size:1.2em;font-family:'Fira Code',sans-serif;color:white`);
        this.inHandle.style(`background:hsl(320,100%,50%);`);
        this.label.html("result");
        this.result.position(18, 20);
        this.frame.child(this.result);
        this.update = () => {
          this.dataOut = this?.inputs?.[0]?.dataOut || "";
          this.result.html(this.dataOut.toString().slice(0, 16));
        };
        break;
        default:
        this.function = null;
        break;
      }
      
      // functions
      
      this.body.mouseClicked((event) => {
        this.offset = this.mCC(event, this.frame.positionArgs);
        this.frame.positionArgs = {
          x: this.x,
          y: this.y,
        };
      })
      this.body.mousePressed((event) => {
        this.offset = this.mCC(this.frame.positionArgs);
        this.frame.clickHeld = true;
      })
      this.label.mousePressed((event) => {
        this.offset = this.mCC(this.frame.positionArgs);
        this.frame.clickHeld = true;
      })
      this.handle.mousePressed((event) => {
        console.log(event)
        this.offset = this.mCC(this.frame.positionArgs);
        this.frame.clickHeld = true;
      })
      this.body.mouseReleased((event) => {
        this.frame.positionArgs = {
          x: this.x,
          y: this.y,
        };
        this.frame.clickHeld = false;
      })
      this.label.mouseReleased((event) => {
        this.frame.positionArgs = {
          x: this.x,
          y: this.y,
        };
        this.frame.clickHeld = false;
      })
      this.handle.mouseReleased((event) => {
        this.frame.positionArgs = {
          x: this.x,
          y: this.y,
        };
        this.frame.clickHeld = false;
      })
      
      this.inHandle.mousePressed((event) => {
        if (!activeNode) {
          this.offset = this.mCC(this.frame.positionArgs);
          this.frame.clickHeld = true;
        }
        if (activeNode) {
          addLink(this);
        }
      })
      this.inHandle.mouseReleased((event) => {
        this.frame.positionArgs = {
          x: this.x,
          y: this.y,
        };
        this.frame.clickHeld = false;
      })
      
      this.outHandle.mouseClicked((event) => {
        addLink(this);
      })
    }
    
    update() {
      // console.log(this?.frame?.textInput);
      // console.log('clear!')
      if (this.frame.textInput && this.type != "jsf") {
        this.body.style("border", "none");
        this.inHandle.style("background", "hsl(100,100%,50%)");
        // this.total.html(this?.dataOut?.toFixed(3));
        this.total.html(this?.dataOut);
        
        // console.log(this);
        switch (this.frame.textInput.value()) {
          case `add()`:
          case `+`:
          // console.log(this.frame.textInput.value());
          this.dataOut = addNodes(this.inputs);
          this.inHandle.style("background", "hsl(0,100%,50%)");
          this.label.html(`function`);
          if (!this.inputs) {
            this.dataOut = 0;
            this.body.style("border", "thin solid red");
          }
          break;
          case `divide()`:
          case `div()`:
          case `/`:
          this.dataOut = divideNodes(this.inputs);
          this.inHandle.style("background", "cyan");
          this.label.html(`function`);
          if (!this.inputs) {
            this.dataOut = 0;
            this.body.style("border", "thin solid red");
          }
          break;
          case `multiply()`:
          case `mult()`:
          case `*`:
          case `x`:
          this.dataOut = multiplyNodes(this.inputs);
          this.inHandle.style("background", "hsl(40,100%,50%)");
          this.label.html(`function`);
          if (!this.inputs) {
            this.dataOut = 0;
            this.body.style("border", "thin solid red");
          }
          break;
          case `subtract()`:
          case `sub()`:
          case `-`:
          this.dataOut = subtractNodes(this.inputs);
          this.inHandle.style(`background`, `hsl(150,100%,50%)`);
          this.label.html(`function`);
          if (!this.inputs) {
            this.dataOut = 0;
            this.body.style("border", "thin solid red");
          }
          break;
          default:
          this.label.html(`data`);
          this.type = "data";
          this.dataOut =
          parseFloat(this?.inputs?.[0]?.dataOut) || parseFloat(this.dataOut);
          break;
        }
      }
      if (this.type == "jsf") {
        try {
          this.dataOut = Function(`"use strict";
          try {
            if (${this.frame.textInput?.value()}) {
              return ${this.frame.textInput.value()}
            }
          } catch (e) {
            //console.log(e)
          }`)();
          this.total.html(this?.dataOut);
        } catch (e) {
          this.dataOut = 0;
        }
        // this.total.html(this?.dataOut?.toFixed(3));
        // this.inHandle.style("background", "blue");
      }
    }
    display() {
      if (this.frame.clickHeld) {
        // console.log("okay");
        this.x =  p.mouseX - this.offset.x;
        this.y =  p.mouseY - this.offset.y;
        this.frame.position(this.x, this.y);
      }
      
      this.out = [this.x + 224, this.y + 32];
      this.in = [this.x, this.y + 32];
      // return this.frame;
    }
    mCC(args) {
      // console.log(event);
      // console.log(this.frame.clickHeld);
      // console.log(`offsetX = ${ p.mouseX - args.x}`);
      // console.log(`offsetY = ${ p.mouseY - args.y}`);
      return {
        x:  p.mouseX - args.x,
        y:  p.mouseY - args.y,
      };
    }
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
  
  function addTextInput(node) {
    let textInput = p.createElement("textarea", node.dataOut);
    node.frame.textInput = textInput;
    textInput.position(18, 24);
    textInput.style(`padding:0px; border:thin solid grey;background:black; color:white;font-size:1.2em;font-family:'Fira Code', sans-serif`);
    textInput.size(180, 22);
    textInput.input = (input) => {
      node.dataOut = textInput.value() * 1;
      // console.log(textInput.value())
      // node.copyLabel.html(this.dataOut);
      // console.log(input)
      // console.log(node.copy)
    }
    node.frame.child(textInput);
  }
  
  let activeNode = null;
  
  function addLink(node) {
    if (activeNode) {
      // if (activeNode.outputs.includes(node) == false) {
      // activeNode.outputs = [...activeNode.outputs, node];
      // }
      if (node.inputs.includes(activeNode) == false) {
        node.inputs = [...node.inputs, activeNode];
      }
      activeNode = null;
    } else {
      activeNode = node;
    }
  }
  
  function orchestrate() {
    if (activeNode) {
      p.line(...activeNode.out,  p.mouseX,  p.mouseY);
    }
    if (contextMenu.displayMenu == true) {
      contextMenu.display();
    }
  }
  
  p.mouseClicked = (event) => {
    if (event.target.classList.contains("p5Canvas")) {
      activeNode = null;
      p5sketch.nodeList = p5sketch.nodeList.map((node) => {
        // return { ...node, frame: { ...frame, clickHeld: false } };
        node.frame.clickHeld = false;
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
  
  class ContextMenu {
    constructor(args) {
      this.frame = p.createDiv();
      this.frame.style("z-index:666;background: black; border: thin solid grey");
      this.frame.size(200, 400);
      this.frame.style("display", "none");
      
      this.commonStyle = `text-align: left; color: white; font-family:'Fira Code', sans-serif`;
      
      this.label0 = p.createP("Add Node");
      this.label0.style(this.commonStyle);
      this.label0.mouseClicked((event) => {
        createNode({ type: "data" });
      })
      this.frame.child(this.label0);
      
      this.label1 = p.createP("Add Result Node");
      this.label1.style(this.commonStyle);
      this.label1.mouseClicked((event) => {
        createNode({ type: "result" });
      })
      this.frame.child(this.label1);
      
      this.label2 = p.createP("Add JSFunction Node");
      this.label2.style(this.commonStyle);
      this.label2.mouseClicked((event) => {
        createNode({ type: "jsf" });
      })
      this.frame.position( p.mouseX,  p.mouseY);
      this.frame.child(this.label2);
      
      this.displayMenu = false;
    }
    display() {
      // console.log('✨')
      return this.frame;
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
    contextMenu.frame.position(p.mouseX,  p.mouseY);
    contextMenu.displayMenu = true;
  }
  
  function hideContextMenu() {
    contextMenu.displayMenu = false;
    contextMenu.frame.style("display", "none");
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
  
  function createNode(args) {
    let tempName = "a" + Date.now();
    console.log(tempName);
    window.swap = new Node({ name: tempName, type: args.type })
    Function(`
    "use strict";
    window.${tempName} = window.swap;
    p5sketch.nodeList.push(window.${tempName});
    console.log(p5sketch.nodeList)
    `)();
    contextMenu.displayMenu = false;
    contextMenu.frame.style("display", "none");
  }
  
  function deleteNode(args) {
    args.node.frame.remove();
    setTimeout(() => {
      // console.log(p5sketch.nodeList.map(node => node.frame.linkLines.child()))
      p5sketch.nodeList.map((node) => {
        [...node.frame.linkLines.list].forEach((elt) => elt.remove());
        node.inputs = node.inputs.filter((input) => input.name != args.node.name);
      });
      p5sketch.nodeList = p5sketch.nodeList.filter((node) => node.name != args.node.name);
    }, 50);
    // console.log(p5sketch.nodeList.length);
  }
  
  function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
}

const my = new p5(p5sketch.function, 'p5Canvas');