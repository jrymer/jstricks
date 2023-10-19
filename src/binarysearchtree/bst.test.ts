import { BSTNode } from "./Node";
import * as algos from "./algorithms";

const a = new BSTNode("a");
const b = new BSTNode("b");
const c = new BSTNode("c");
const d = new BSTNode("d");
const e = new BSTNode("e");
const f = new BSTNode("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

describe("Binary Search Tree tests", () => {
  describe("Depth First", () => {
    it("Iterative Base Case", () => {
      expect(algos.depthFirstIterativePrint(a)).toEqual([
        "a",
        "b",
        "d",
        "e",
        "c",
        "f",
      ]);
    });
    it("Recursive Base Case", () => {
      expect(algos.depthFirstRecursivePrint(a)).toEqual([
        "a",
        "b",
        "d",
        "e",
        "c",
        "f",
      ]);
    });
  });
  describe("Breadth First", () => {
    it("base case", () => {
      expect(algos.breadthFirstPrint(a)).toEqual([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ]);
    });
  });
  describe("Tree Includes", () => {
    it("Breadth First Includes", () => {
      expect(algos.iterativeBreadthFirstTreeIncludes(a, "e")).toBeTruthy();
    });
    it("Breadth First does not include", () => {
      expect(algos.iterativeBreadthFirstTreeIncludes(a, "z")).toBeFalsy();
    });
    it("Depth First includes", () => {
      expect(algos.recursiveDepthFirstTreeIncludes(a, "e")).toBeTruthy();
    });
    it("Depth First does not include", () => {
      expect(algos.recursiveDepthFirstTreeIncludes(a, "z")).toBeFalsy();
    });
  });
  describe("Tree Sum", () => {
    const treeSumRoot = new BSTNode(3);
    const treeSumB = new BSTNode(11);
    const treeSumC = new BSTNode(4);
    const treeSumD = new BSTNode(2);
    const treeSumE = new BSTNode(4);
    const treeSumF = new BSTNode(1);

    treeSumRoot.left = treeSumB;
    treeSumRoot.right = treeSumE;
    treeSumB.left = treeSumC;
    treeSumB.right = treeSumD;
    treeSumE.right = treeSumF;

    //      3
    //    /   \
    //   11    4
    //  / \     \
    // 4   2     1
    // sum = 25

    it("Breadth first", () => {
      expect(algos.treeSumIterative(treeSumRoot)).toEqual(25);
    });
    it("Depth first", () => {
      expect(algos.treeSumRecursive(treeSumRoot)).toEqual(25);
    });
  });
  describe("Tree Min Value", () => {
    const treeMinRoot = new BSTNode(5);
    const treeMinB = new BSTNode(11);
    const treeMinC = new BSTNode(4);
    const treeMinD = new BSTNode(15);
    const treeMinE = new BSTNode(3);
    const treeMinF = new BSTNode(12);

    treeMinRoot.left = treeMinB;
    treeMinRoot.right = treeMinE;
    treeMinB.left = treeMinC;
    treeMinB.right = treeMinD;
    treeMinE.right = treeMinF;

    //      5
    //    /   \
    //   11    3
    //  / \     \
    // 4   15     12
    // min = 3

    it("Breadth first", () => {
      expect(algos.treeMinIterative(treeMinRoot)).toEqual(3);
    });
    it("Depth first", () => {
      expect(algos.treeMinRecursive(treeMinRoot)).toEqual(3);
    });
  });
  describe("Max Root to Leaf Path Sum", () => {
    const treeSumRoot = new BSTNode(3);
    const treeSumB = new BSTNode(11);
    const treeSumC = new BSTNode(4);
    const treeSumD = new BSTNode(2);
    const treeSumE = new BSTNode(4);
    const treeSumF = new BSTNode(1);

    treeSumRoot.left = treeSumB;
    treeSumRoot.right = treeSumE;
    treeSumB.left = treeSumC;
    treeSumB.right = treeSumD;
    treeSumE.right = treeSumF;

    //      3
    //    /   \
    //   11    4
    //  / \     \
    // 4   2     1
    // Max root to leave sum is 18

    it("Works for a tree", () => {
      expect(algos.MRLPS(treeSumRoot)).toEqual(18);
    });
    it("Works for a singular node", () => {
      expect(algos.MRLPS(treeSumF)).toEqual(1);
    });
    it("Works for a negative number", () => {
      treeSumC.right = new BSTNode(-10);
      treeSumC.left = new BSTNode(-10);
      treeSumF.left = new BSTNode(-19);
      treeSumE.left = new BSTNode(-4);

      //       3
      //     /   \
      //    11    4
      //   / \   / \
      //  4   2 -4 1
      // / \       /
      //-10-10   -19
      // sum = 25
      expect(algos.MRLPS(treeSumRoot)).toEqual(16);
    });
  });
});
