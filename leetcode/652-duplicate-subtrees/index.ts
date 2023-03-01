/**
Given the root of a binary tree, return all duplicate subtrees.
For each kind of duplicate subtrees, you only need to return the root node of any one of them.

 The number of the nodes in the tree will be in the range [1, 5000]
-200 <= Node.val <= 200

so negative numbers
and max 3 bytes as string if offset
5000 nodes is not enormous
*/

import { dumpGraph, TreeNode } from './util'
import assert from '../../util/test';
import monster from './moster_test';


/*
create an index of nodes by value
each node has and array of nodes by value

walk those nodes each time

*/

type FlatGraph = Array<number | null>;

function findDuplicateSubtrees(root: TreeNode): Array<TreeNode | null> {
    const allFlat: FlatGraph[] = [];
    const duplicatesFlat: FlatGraph[] = [];

    const isFlatDuplicate = (target: FlatGraph, compare: FlatGraph): boolean => {
        if (target.length != compare.length) {
            return false;
        }
        for (var i = 0; i < target.length; i++) {
            if (target[i] != compare[i])
                return false;
        }
        return true;
    };

    const workingQueue: TreeNode[] = [root];
    while (workingQueue.length) {
        const node = workingQueue.shift();
        if (node === undefined) {
            break;
        }

        const flatNode = flattenGraph(node);
        const duplicate = allFlat.find(n => isFlatDuplicate(flatNode, n));

        // append if unique
        if (duplicate) {
            if (duplicatesFlat.includes(duplicate)) {
            } else {
                duplicatesFlat.push(duplicate)
            }
        } else {
            allFlat.push(flatNode);
        }

        if (node.left)
            workingQueue.push(node.left);

        if (node.right)
            workingQueue.push(node.right);
    }

    return duplicatesFlat.map(d => generateGraph(d));
};

const flattenGraph = (root: TreeNode | null): FlatGraph => {
    const ret: FlatGraph = [];
    const queue: Array<TreeNode | null> = [root];

    let node: TreeNode | null | undefined;
    do {
        node = queue.shift();
        if (node === null) {
            ret.push(null);
        }
        else if (node) {
            ret.push(node.val);
            queue.push(node.left)
            queue.push(node.right);
        }
    } while (queue.length);

    // trim trailing nulls
    while (1) {
        if (ret[ret.length - 1] == null) {
            ret.pop();
        } else {
            break;
        }

    }
    return ret;
}

const generateGraph = function (input: FlatGraph): TreeNode {
    let currentNode: TreeNode | undefined;
    let nodeQueue: TreeNode[] = [];
    let rootNode: TreeNode;

    let val = input[0];
    rootNode = currentNode = new TreeNode(val == null ? undefined : val);

    let didLeft = false;

    for (let i = 1; i < input.length; i++) {
        if (!currentNode) {
            throw new Error("missing currentNode with remaining input!");
        }

        const val = input[i];

        if (!didLeft) {
            if (val === null) {
                currentNode.left = null
            }
            else {
                currentNode.left = new TreeNode(val);
                nodeQueue.push(currentNode.left);

            }
            didLeft = true;
            continue;
        }

        if (val === null) {
            currentNode.right = null
        }
        else {
            currentNode.right = new TreeNode(val);
            nodeQueue.push(currentNode.right);
        }

        currentNode = nodeQueue.shift();
        didLeft = false;
    };
    return rootNode;
}
/*
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]
 
Input: root = [2,1,1]
Output: [[1]]
 
Input: root = [2,2,2,3,null,3,null]
Output: [[2,3],[3]]
*/

function testInput(input: FlatGraph, expected: FlatGraph[]) {
    const graph = generateGraph(input);
    const duplicates = findDuplicateSubtrees(graph);
    const flatDuplicates = duplicates.map(n => flattenGraph(n));
    assert(flatDuplicates, expected);
}
testInput([1, 2, 3, 4, null, 2, 4, null, null, 4], [[2, 4], [4]]);
testInput([2, 1, 1], [[1]]);
testInput([2, 2, 2, 3, null, 3, null], [[2, 3], [3]])
testInput([1, 2, 2, 3, 4, 3, 5], [[3]]);
testInput([1, 2, 2, 3, 4, 3, 4], [[2, 3, 4], [3], [4]]);
testInput(monster, []);
