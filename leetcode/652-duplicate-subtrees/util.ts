

export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

export const dumpGraph = function (root: TreeNode | null): void {
    const flatGraph = (node: TreeNode | null): any => {
        if (node) {
            const val = node.val;
            if (!(node.left || node.right)) {
                return [val];
            }
            return [
                val,
                flatGraph(node.left), flatGraph(node.right)
            ]
        }
        return null;
    }
    console.log(flatGraph(root));
}
