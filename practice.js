

  
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  
  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      /* If the tree already exists, then start at the root, 
         and compare it to the key you want to insert.
         If the new key is less than the node's key 
         then the new node needs to live in the left-hand branch */
      /* If the existing node does not have a left child, 
             meaning that if the `left` pointer is empty, 
             then we can just instantiate and insert the new node 
             as the left child of that node, passing `this` as the parent */
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        /* If the node has an existing left child, 
             then we recursively call the `insert` method 
             so the node is added further down the tree */
        this.left.insert(key, value);
      }
    } else {
      /* Similarly, if the new key is greater than the node's key 
         then you do the same thing, but on the right-hand side */
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  
  find(key) {
    // If the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      /* If the item you are looking for is less than the root 
         then follow the left child.
         If there is an existing left child, 
         then recursively check its left and/or right child
         until you find the item */
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      /* If the item you are looking for is greater than the root 
         then follow the right child.
         If there is an existing right child, 
         then recursively check its left and/or right child
         until you find the item */
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child, 
             then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
             then you replace it with its right child */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children then
             simply remove it and any references to it 
             by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }
  
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

// problems

// 3

// function problem3() {
//   let BST = new BinarySearchTree();
//   BST.insert(3);
//   BST.insert(1);
//   BST.insert(4);
//   BST.insert(6);
//   BST.insert(9);
//   BST.insert(2);
//   BST.insert(5);
//   BST.insert(7);
//   console.log(BST);
// }

// return problem3();

// 3p2

// function problem3p2() {
//   let BST = new BinarySearchTree();
//   BST.insert('E');
//   BST.insert('A');
//   BST.insert('S');
//   BST.insert('Y');
//   BST.insert('Q');
//   BST.insert('U');
//   BST.insert('E');
//   BST.insert('S');
//   BST.insert('T');
//   BST.insert('I');
//   BST.insert('O');
//   BST.insert('N');
//   console.log(BST);
// }

// return problem3p2();

// 4

// function problem4() {
//   let BST = new BinarySearchTree();
//   BST.insert('E', 'E');
//   BST.insert('A', 'A');
//   BST.insert('S', 'S');
//   BST.insert('Y', 'Y');
//   BST.insert('Q', 'Q');
//   BST.insert('U', 'U');
//   BST.insert('E', 'E');
//   BST.insert('S', 'S');
//   BST.insert('T', 'T');
//   BST.insert('I', 'I');
//   BST.insert('O', 'O');
//   BST.insert('N', 'N');

//   return BST;
// }

// function tree(t) {
//   if (!t) {
//     return 0;
//   }
//   return tree(t.left) + t.value + tree(t.right);
// }

// console.log(tree(problem4()));

// I believe it prints out the binary search tree. It has a run time of O(log n);

// 5

// Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?

// function problem5() {
//   let BST = new BinarySearchTree();
//   BST.insert('E', 'E');
//   BST.insert('A', 'A');
//   BST.insert('S', 'S');
//   BST.insert('Y', 'Y');
//   BST.insert('Q', 'Q');
//   BST.insert('U', 'U');
//   BST.insert('E', 'E');
//   BST.insert('S', 'S');
//   BST.insert('T', 'T');
//   BST.insert('I', 'I');
//   BST.insert('O', 'O');
//   BST.insert('N', 'N');
//   return BST;
// }

// // function will take in a tree

// //it will find the min and find the max of the tree, incrementing the COUNT variable along the way. Then it will compare the find max and find min and take the higher number

// function findHeight(tree) {
//   if (tree.left === null && tree.right === null) {
//     return 1;
//   }

//   let leftHeight = 0;
//   let rightHeight = 0;

//   if (tree.left) {
//     leftHeight = 1 + findHeight(tree.left);
//   }
//   if (tree.right) {
//     rightHeight = 1 + findHeight(tree.right);
//   }

//   if (leftHeight >= rightHeight) {
//     return leftHeight;
//   } else {
//     return rightHeight;
//   }
// }

// console.log(findHeight(problem5()));

// the runtime of this algorithm is O(n);

// 6

function isBST(t) {
  if(t.left === null && t.right === null) {
    return true;
  }
  else if (t.left > t || t.right < t) {
    return false;
  }
  else if (!t.left) {
    return isBST(t.right);
  }
  else if (!t.right) {
    return isBST(t.left);
  }
  return (isBST(t.left) && isBST(t.right));
}



function main() {
  const BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  /*
    BST.remove(3); 
    BST.insert('E');
    BST.insert('A');
    BST.insert('S');
    BST.insert('Y');
    BST.insert('Q');
    BST.insert('U');
    BST.insert('E');
    BST.insert('S');
    BST.insert('T');
    BST.insert('I');
    BST.insert('O');
    BST.insert('N');
    */
  console.log(BST);
  //   console.log('height is ', height(BST));
  console.log(isBST(BST));
}

main(); 

// 7

// function 3rdLargest(t) { curr = t.root; 3rdLargest = Null;

//     count = 0;
    
//     while (curr) { if(!curr.right) { count += 1; if (count === 3) { 3rdLargest = curr; } curr = curr.left; } } }