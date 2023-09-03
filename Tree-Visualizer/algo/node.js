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
    const createArray = (arr, x, y, width, height)=>{
        let arrayData = arr.map((value, i)=>{
            if(i>0){
                x+=50
            }
            return {x, y, width, height, color:regFill, value}
        })

        let elementArr = arrayContainer.selectAll("rect").data(arrayData).enter().append("rect").on("click",addHighlight);
        d3.select("#array-visual").attr("align", "center")
        elementArr.attr("x", d=>d.x).attr("y", d=>d.y).attr("width", d=>d.width)
        
        arrayContainer.selectAll("text.rect").data(arrayData).enter().append("text").attr("class", "rext").on("click", addHighlight).attr("x", d=>d.x+(d.width/2)-(d.value.toString().length*4)).attr("y", d=>d.y+30).text(d=>d.value).call(textAttr, regFillText, "sans-serif", "1rem")
        arrayContainer.selectAll("text.index").data(arrayData).enter().append("text").attr("class", "index").text((d, i)=>`[${i}]`).attr("x", d=>d.x+15).attr("y", d=>d.y-15).call(textAttr, regFillText, "sans-serif", "15px")
        
        return arrayData
    }

    const circleAttr=(Selection)=>{
            Selection.attr("cx", (c)=>{return c.cx}).attr("cy", 0).attr("r", (c)=>{return c.radius}).attr("fill", (c)=>{return c.fill}).transition().duration(300).attr("cy", (c)=>{return c.cy})
    }
    const textAttr = (selection, fill, fontFamily, fontSize){
        selection.attr("fill", fill).attr("font-family", fontFamily).attr("font-size", fontSize);
    }

    const createLineAttr = (selection, stroke, x1, y1, x2, y2)=>{
        selection.style("stroke", stroke).attr("x1", x1).attr("y1", 0).attr("x2", x2).attr("y2", 0).transition().duration(100).attr("y1", y1).attr("y2", y2)
    }

    const addHighlight = (data, index)=>{
        removeHighlight();
        const indexMatch = (d, i) => {return i==index?this:null};
        d3.selectAll("circle").select(indexMatch).attr("fill", highlightFill);
        d3.selectAll("rect").select(indexMatch).attr("fill", highlightFill);
        d3.selectAll("text.circle").select(indexMatch).attr("fill", highlightFillText);
        d3.selectAll("text.rect").select(indexMatch).attr("fill", highlightFillText);
    }
    const removeHighlight = ()=>{
        d3.selectAll("circle").attr("fill", regFill)
        d3.selectAll("rect").attr("fill", regFill)
        d3.selectAll("text.circle").attr("fill", regFillText)
        d3.selectAll("text.rect").attr("fill", regFillText);
    }

    const calcDimensions=(arr)=>{
        let depth = Math.ceil(Math.log2((arr.length -1)+2))-1;
        return {width:Math.pow(2, depth), height:ySpacing+ySpacing*depth, depth:depth}
    }

    const createContainer = (id, arr, width, height) =>{
        let box = calcDimensions(arr);
        let depth = Math.ceil(Math.log2(arr.length - 1)+2)-1||1;
        let container = d3.select(`div#{id}`).append('svg').attr('width', width || box.width*600*(.8/depth)*.75).attr('height', height || box.height)

        return container
    }