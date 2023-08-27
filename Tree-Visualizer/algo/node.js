let regFillTest = "black";
let highlightFillText = "white";

let treeContainer;
let arrayContainer;
let start; 

const xSpacing = 200;
const ySpacing = 100;
const radius = 35;

const Node = (value, index, depth, cx, cy) =>{
    this.value = value;
    this.index = index;
    this.depth = depth;
    this.radius = radius;
    this.cx = cx;
    this.cy = cy;
    this.left = null;
    this.right = null;
    this.fill = regFill;
    this.highlighted = false;
} 

