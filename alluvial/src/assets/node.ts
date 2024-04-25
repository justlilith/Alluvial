import p5 from "p5";
import { addLink, addNodes, addTextInput, deleteNode, divideNodes, multiplyNodes, renameNode, subtractNodes } from "./functions";
import { activeNode } from "./constants";

class AlluvialNode {
    p: p5;

    name: string;
    x: number;
    y: number;
    positionArgs: {};
    clickHeld: boolean;
    nameLabelInput: p5.Element;
    in: number[];
    out: number[];
    copy: string;
    outputs: AlluvialNode[];
    dataOut: number;
    color: string;
    type: string;
    input: AlluvialNode[];
    inputs: AlluvialNode[];

    linkLines: {
        element: p5.Element
        list: p5.Element[]
    }

    offset: {
        x: number,
        y: number
    }

    result: p5.Element
    frame: p5.Element
    textInput: p5.Element
    body: p5.Element
    label: p5.Element
    topBar: p5.Element
    total: p5.Element
    nameLabel: p5.Element
    handle: p5.Element
    inHandle: p5.Element
    outHandle: p5.Element
    closeButton: p5.Element

    constructor(args) {
        this.p = args?.p

        this.name = args?.name || "node";
        this.x = args?.x || args.p.mouseX;
        this.y = args?.y || args.p.mouseY;
        this.outputs = args?.outputs || null;
        this.color = args?.color || `white`;
        this.type = args?.type || "data";
        this.copy = args?.copy || args?.data || null;
        this.input = args?.input || [];
        this.inputs = args?.inputs || [];
        this.dataOut = args?.data || "";

        this.linkLines = {
            element: args.p.createDiv(),
            list: []
        }

        this.textInput = args.p.createDiv()
        this.result = args.p.createDiv()

        this.out = [this.x + 224, this.y + 32];
        this.in = [this.x, this.y + 32];

        this.offset = { x: 0, y: 0 };
        this.frame = args.p.createDiv();
        this.frame.class("node");
        this.frame.id(this.name);
        this.frame.position(this.x, this.y);
        // this.frame.size(300, 64);
        this.frame.style("/* background:red;*/position:fixed;");
        this.positionArgs = {
            x: this.x,
            y: this.y,
        };
        this.clickHeld = false;

        this.inHandle = args.p.createDiv();
        this.inHandle.size(12, 64);
        this.inHandle.position(0, 0);
        this.inHandle.style(`background:${this.color};`);
        this.inHandle.style("border-radius", "0 0 0 6px");

        this.frame.child(this.inHandle);

        this.body = args.p.createDiv();
        this.body.size(200, 64);
        this.body.style(`background:hsla(0,0%,0%,0.8)`);
        this.body.position(12, 0);
        this.frame.child(this.body);

        this.topBar = args.p.createDiv();
        this.topBar.position(0);
        this.topBar.style(`display:flex; flex-direction:row; z-index:67; align-contents:center; width:100%`);
        this.frame.child(this.topBar);

        this.closeButton = args.p.createDiv("x");
        this.closeButton.size(12, 12);
        // this.closeButton.position(0, 0);
        this.closeButton.style(`user-select:none; text-align:center;z-index:66;font-size:.6em;font-family:'Fira Code',sans-serif;color:white; background:black; border: thin solid grey; border-style:inset; vertical-align:super;margin-right:6px;`);
        this.closeButton.mouseClicked((event) => {
            deleteNode({ node: this });
        })
        this.topBar.child(this.closeButton);

        this.label = args.p.createDiv(args?.name);
        this.label.style(`user-select:none; font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
        // this.label.position(18, 3);
        this.topBar.child(this.label);

        this.handle = args.p.createDiv("::::::::");
        this.handle.style(`text-align:center; flex-grow: 1; user-select:none; font-size:.8em;font-family:'Fira Code',sans-serif;color:hsl(0,0%,20%)`);
        // this.handle.position(18, 3);
        this.topBar.child(this.handle);

        this.total = args.p.createSpan(this?.dataOut);
        this.total.style(`user-select:none; text-align:right;z-index:66;font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
        this.total.position(200, -10);
        this.frame.child(this.total);

        this.outHandle = args.p.createDiv();
        this.outHandle.size(12, 64);
        this.outHandle.style(`background:grey`);
        this.outHandle.position(212, 0);
        this.outHandle.style("border-radius", "0 6px 6px 0");
        this.frame.child(this.outHandle);

        this.nameLabel = args.p.createSpan("Node name: ");
        this.nameLabel.position(0, 64);
        this.nameLabel.style(`user-select:none; position:relative; display:inline; background:black; text-align:left;z-index:66;font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
        this.frame.child(this.nameLabel);

        this.nameLabelInput = args.p.createInput(this?.name.toString());
        this.nameLabelInput.position(0, 64);
        this.nameLabelInput.size(120);
        this.nameLabelInput.style(`display:inline; position:relative; background:black; border: thin solid grey; text-align:left;z-index:66;font-size:.8em;font-family:'Fira Code',sans-serif;color:white`);
        this.nameLabelInput.mouseClicked((event) => {
            renameNode(this, this.nameLabelInput.value());
        })
        this.frame.child(this.nameLabelInput);

        this.linkLines.element = args.p.createDiv();
        this.linkLines.element.class("linkLine");
        this.linkLines.list = [];

        switch (this.type) {
            case "function":
                addTextInput(args.p, this);
                break;
            case "data":
                addTextInput(args.p, this);
                this.dataOut = this.dataOut * 1;
                break;
            case "jsf":
                addTextInput(args.p, this);
                // this.inHandle.style(`background:white;`);
                this.textInput.value(4);

                break;
            case "result":
                this.dataOut = this?.inputs?.[0]?.dataOut;
                this.result = args.p.createSpan(this.copy);
                this.result.style(`font-size:1.2em;font-family:'Fira Code',sans-serif;color:white`);
                this.inHandle.style(`background:hsl(320,100%,50%);`);
                this.label.html("result");
                this.result.position(18, 20);
                this.frame.child(this.result);
                this.update = () => {
                    this.dataOut = this?.inputs?.[0]?.dataOut || 0;
                    this.result.html(this.dataOut.toString().slice(0, 16));
                };
                break;
            default:
                break;
        }

        // functions

        this.body.mouseClicked((event) => {
            this.offset = this.mCC({p: args.p, ...this.positionArgs});
            this.positionArgs = {
                x: this.x,
                y: this.y,
            };
        })
        this.body.mousePressed((event) => {
            this.offset = this.mCC({p: args.p, ...this.positionArgs});
            this.clickHeld = true;
        })
        this.label.mousePressed((event) => {
            this.offset = this.mCC({p: args.p, ...this.positionArgs});
            this.clickHeld = true;
        })
        this.handle.mousePressed((event) => {
            console.log(event)
            this.offset = this.mCC({p: args.p, ...this.positionArgs});
            this.clickHeld = true;
        })
        this.body.mouseReleased((event) => {
            this.positionArgs = {
                x: this.x,
                y: this.y,
            };
            this.clickHeld = false;
        })
        this.label.mouseReleased((event) => {
            this.positionArgs = {
                x: this.x,
                y: this.y,
            };
            this.clickHeld = false;
        })
        this.handle.mouseReleased((event) => {
            this.positionArgs = {
                x: this.x,
                y: this.y,
            };
            this.clickHeld = false;
        })

        this.inHandle.mousePressed((event) => {
            if (!activeNode) {
                this.offset = this.mCC(this.positionArgs);
                this.clickHeld = true;
            }
            if (activeNode) {
                addLink(this);
            }
        })
        this.inHandle.mouseReleased((event) => {
            this.positionArgs = {
                x: this.x,
                y: this.y,
            };
            this.clickHeld = false;
        })

        this.outHandle.mouseClicked((event) => {
            addLink(this);
        })
    }

    update() {
        // console.log(this?.frame?.textInput);
        // console.log('clear!')
        if (this.textInput && this.type != "jsf") {
            this.body.style("border", "none");
            this.inHandle.style("background", "hsl(100,100%,50%)");
            // this.total.html(this?.dataOut?.toFixed(3));
            this.total.html(`${this?.dataOut}`);

            // console.log(this);
            switch (this.textInput.value()) {
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
                        parseFloat(`${this?.inputs?.[0]?.dataOut}`) || parseFloat(`${this.dataOut}`);
                    break;
            }
        }
        if (this.type == "jsf") {
            try {
                this.dataOut = Function(`"use strict";
          try {
            if (${this.textInput?.value()}) {
              return ${this.textInput.value()}
            }
          } catch (e) {
            //console.log(e)
          }`)();
                this.total.html(`${this?.dataOut}`);
            } catch (e) {
                this.dataOut = 0;
            }
            // this.total.html(this?.dataOut?.toFixed(3));
            // this.inHandle.style("background", "blue");
        }
    }
    display() {
        if (this.clickHeld) {
            // console.log("okay");
            this.x = this.p.mouseX - this.offset.x;
            this.y = this.p.mouseY - this.offset.y;
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
            x: args.p.mouseX - args.x,
            y: args.p.mouseY - args.y,
        };
    }
}

export {
    AlluvialNode
}