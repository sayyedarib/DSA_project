let input; 

 const reset = ()=>{
    d3.selectAll('svg').remove();
 }

 const treeAndArray = () =>{
    reset();
    let inputText = document.getElementById("array-input")
    if(inputText.value !== ''){
        input = inputText.calue.trim().split(/\s+|\,+/g).map((num)=>parseInt(num));
        makeHeap(input, input.length);
        createBinaryTreeAndArr(input);
        document.getElementById('instructions').innerHTML = "<p>Parent's value is always greater than or equal to the values of its children.</p>";
        document.getElementById("visual-title").innerHTML = "Max-Heap Binary Tree and Array";
    }
}

const createBinaryTreeAndArr=(arr)=>{
    arrayContainer = createContainer("array-visual", arr, arr.length*60, 100);
    let tree = new Tree();
    tree.createBinaryTree(input);
    createArray(arr, 2, 30, 50, 50);
}

const createBinarySearchTree=()=>{
    let inputText = document.getElementById("array-input")
    if(inputText.value !== ''){
        reset();
        input = inputText.value.trim().split(/\s+|\,+/g).map((num)=>parseInt(num));
        input.sort((a, b)=>a-b);
        document.querySelector('#visual-title').innerHTML = "Binary Search Tree"
        document.querySelector('#instructions').innerHTML = "The input data sorted and arranged into a binary seach tree.";
        let tree = new Tree();
        tree.createBinarySearchTree(input);
    }
}

//defautl value
input  =[10, 20, 60, 30, 70, 50];
let inputTest = document.getElementById("array-input");
inputTest.value = input;
createBinaryTreeAndArr(input);