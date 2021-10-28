"use strict";

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
    });
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
    this.nameLabelInput.input((event) => {
      renameNode(this, this.nameLabelInput.value());
    });
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
    });
    this.body.mousePressed((event) => {
      this.offset = this.mCC(this.frame.positionArgs);
      this.frame.clickHeld = true;
    });
    this.label.mousePressed((event) => {
      this.offset = this.mCC(this.frame.positionArgs);
      this.frame.clickHeld = true;
    });
    this.handle.mousePressed((event) => {
      console.log(event)
      this.offset = this.mCC(this.frame.positionArgs);
      this.frame.clickHeld = true;
    });
    this.body.mouseReleased((event) => {
      this.frame.positionArgs = {
        x: this.x,
        y: this.y,
      };
      this.frame.clickHeld = false;
    });
    this.label.mouseReleased((event) => {
      this.frame.positionArgs = {
        x: this.x,
        y: this.y,
      };
      this.frame.clickHeld = false;
    });
    this.handle.mouseReleased((event) => {
      this.frame.positionArgs = {
        x: this.x,
        y: this.y,
      };
      this.frame.clickHeld = false;
    });
    
    this.inHandle.mousePressed((event) => {
      if (!activeNode) {
        this.offset = this.mCC(this.frame.positionArgs);
        this.frame.clickHeld = true;
      }
      if (activeNode) {
        addLink(this);
      }
    });
    this.inHandle.mouseReleased((event) => {
      this.frame.positionArgs = {
        x: this.x,
        y: this.y,
      };
      this.frame.clickHeld = false;
    });
    
    this.outHandle.mouseClicked((event) => {
      addLink(this);
    });
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


class ContextMenu {
  constructor(args) {
    this.frame = p.createDiv();
    this.frame.style("z-index:666;background: black; border: thin solid grey");
    this.frame.size(200, 400);
    this.frame.style("display", "none");
    
    this.commonStyle = `color: white; font-family:'Fira Code', sans-serif`;
    
    this.label0 = p.createP("Add Node");
    this.label0.style(this.commonStyle);
    this.label0.mouseClicked((event) => {
      p.createNode({ type: "data" });
    });
    this.frame.child(this.label0);
    
    this.label1 = p.createP("Add Result Node");
    this.label1.style(this.commonStyle);
    this.label1.mouseClicked((event) => {
      p.createNode({ type: "result" });
    });
    this.frame.child(this.label1);
    
    this.label2 = p.createP("Add JSFunction Node");
    this.label2.style(this.commonStyle);
    this.label2.mouseClicked((event) => {
      p.createNode({ type: "jsf" });
    });
    this.frame.position( p.mouseX,  p.mouseY);
    this.frame.child(this.label2);
    
    this.displayMenu = false;
  }
  display() {
    // console.log('✨')
    return this.frame;
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