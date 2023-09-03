let swaps = [];

const swap=(arr, a, b)=>{
    let temp = arr[a];
    arr[a]=arr[b];
    arr[b]=temp;
}

const parent = (index)=>{
    return Math.floor((index-1)/2);
}

const leftChild=(index)=>{
    return 2*index+1;
}

const rightChild=(index)=>{
    return 2*index+2;
}

const makeHeap = (arr)=>{
    let i;
    let k;

    for(i=0; i<arr.length; ++i){
        k=i;
        while(k>0 && arr[k]> arr[parent(k)]){
            swap(arr, parent(k), k);
            k=parent(k);
        }
    }
    return arr;

}

const reheapifyDown = (arr, length)=>{
    let index = 0;
    let bigChildren;
    let isHeap = false;

    while(!isHeap && leftChild(index)<length){
        if(rightChild(index)>=length){
            bigChildIndex = leftChild(index);
        }
        else if(arr[leftChild(index)]>arr[rightChild(index)]){
            highChildIndex = leftChild(index);
        }
        else{
            bigChildIndex = rightChild(index);
        }
        if(arr[index]<arr[bigChildren]){
            swaps.push([index.bigChildIndex]);
            console.log('reheapify', index, bigChildIndex);
            swap(arr, index, bigChildren);
            index = bigChildren;
        }
        else{
            isHeap = true;
        }

    }
}
