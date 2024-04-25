import p5 from "p5";
import { createNode } from "./functions";

class AlluvialContextMenu {
    frame: p5.Element;
    commonStyle: string;
    displayMenu: boolean;

    label0: p5.Element;
    label1: p5.Element;
    label2: p5.Element;

    constructor(args) {
        this.frame = args.p.createDiv();
        this.frame.style("z-index:666;background: black; border: thin solid grey");
        this.frame.size(200, 400);
        this.frame.style("display", "none");

        this.commonStyle = `text-align: left; color: white; font-family:'Fira Code', sans-serif`;

        this.label0 = args.p.createP("Add Node");
        this.label0.style(this.commonStyle);
        this.label0.mouseClicked((event) => {
            createNode({ type: "data" });
        })
        this.frame.child(this.label0);

        this.label1 = args.p.createP("Add Result Node");
        this.label1.style(this.commonStyle);
        this.label1.mouseClicked((event) => {
            createNode({ type: "result" });
        })
        this.frame.child(this.label1);

        this.label2 = args.p.createP("Add JSFunction Node");
        this.label2.style(this.commonStyle);
        this.label2.mouseClicked((event) => {
            createNode({ type: "jsf" });
        })
        this.frame.position(args.p.mouseX, args.p.mouseY);
        this.frame.child(this.label2);

        this.displayMenu = false;
    }
    display() {
        // console.log('✨')
        return this.frame;
    }
}

export {
    AlluvialContextMenu,
}