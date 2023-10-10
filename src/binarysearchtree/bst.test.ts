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

export { a };

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
});
