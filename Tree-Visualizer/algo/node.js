let regFillText = "black";
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

const Tree = () => {
    this.nodes = [];
    this.data = [];
    this.text = [];

    this.addNode = function(node){
        this.data.push(node);
        this.text = treeContainer.selectAll("text.circle").data(this.data).enter().append("text").attr("class", "circle").attr("x", d=>d.cx - (d.value.toString().length*4)).attr("y", 0).text(d=>d.value).transition().duration(100).attr("y", d=>d.cy + 5).call(textAttr, regFillText, "sans-serif", "len");
        this.nodes = treeContainer.selectAll("circle").data(this.data).enter().append("circle");
    }

    this.updateNode = () =>{
        this.nodes = treeContainer.selectAll("circle").data(this.data).enter().append("circle")
    }

    this.swapNodeData = (a, b)=>{
        let temp = this.data(a);
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }

    this.findNode = (index)=>{
        return this.nodes.filter((d)=>d.index == index);
    }

    this.findText = (index) =>{
        return this.text.filter((d)=> d.index == index);
    }

    this.removeNode = (index) =>{
        this.findNode(index).remove();
        this.findText(index).remove();

        this.data = this.data.filter((e, i)=>{return i !==index});
        this.text = this.text.filter((e, i)=>{return i!==index});

        this.nodes = treeContainer.selectAll("circle").data(this.data).exit().remove();
    }

    this.createBinaryTree = (arr) => {
        treeContainer = createContainer("binary-tree", arr);
        start = treeContainer.attr("width")/2;

        let i=0;
        let node = [];

        while(i<arr.length){
            let depth = Math.ceil(Math.log2(i+2))-1;
            node = new Node(arr[i], i, depth);

            if(i==0){
                node.cx = start;
                node.cy = radius;
            }
            else{
                if(i==leftchild(parent(i))){
                   node.cx = this.data[parent(i)].cx - xSpacing/depth;  
                }
                else{
                    node.cx = this.data[parent(i)].cx+xSpacing/depth;
                }
                node.cy = this.data[parent(i)].cy + ySpacing;
                treeContainer.append("line").call(createLineAttr, "black", this.data[parent(i)].cx, this.data[parent(i)].cy, node.cx, node.cy);
            }
            this.addNode(node);
            ++i;
        }

        this.nodes = treeContainer.selectAll("circle").raise().on("click", addHighlight);
        this.text = treeContainer.selectAll("text.circle").raise().on("click", addHighlight);
        this.nodes.call(circleAttr);
    }

    this.createBinarySearchTree = (inputArr) =>{
        treeContainer = createContainer("binary-tree", inputArr);
        start = treeContainer.attr("width")/2;
        
        let midPoint = Math.floor(inputArr.length/2);
        let root = new Node(inputArr[midPoint], null, 1, start, radius);

        const insertNode = (arr, depth, cx) => {
            if(!arr.length){return;}
            let mid = Math.floor(arr.length/2);
            let node = new Node(arr[mid], null, depth, cx, radius, + (depth*ySpacing));

            node.left = insertNode(arr.slice(0, mid), nextDepth, cx - xSpacing/nextDepth);
            node.right = insertNode(arr.slice(mid+1), nextDepth, cx+xSpacing/nextDepth);

            if(arr.slice(0, mid).length){
                treeContainer.append("line").call(createLineAttr, "black", cx, radius+(depth*ySpacing), cx-xSpacing/nextDepth, radius+nextDepth*ySpacing)
            }
            if(arr.slice(mid+1).length){
                treeContainer.append("line").call(createLineAttr, "black", cx, radius+(depth*ySpacing), cx+xSpacing/nextDepth, radius+nextDepth*ySpacing)
            }
            this.addNode(node);
        }

        root.left = insertNode(inputArr.slice(0, midPoint), 1, start-xSpacing);
        root.right = insertNode(inputArr.slice(midPoint+1), 1, start+xSpacing);

        if(inputArr.slice(0, midPoint).length){
            treeContainer.append("line").call(createLineAttr, "black", start, radius, start - xSpacing, radius+ySpacing);
        }
        if(inputArr.slice(midPoint+1).length){
            treeContainer.append("line").call(createLineAttr, "black", start, radius, start + xSpacing, radius+ySpacing);
        }
        this.addNode = treeContainer.selectAll("circle").raise()

        this.text = treeContainer.selectAll("text.circle").raise();

        this.nodes.call(circleAttr);
    }

    
}