import { LLNode } from "./Node";
import * as algos from "./algorithms";

const a = new LLNode("a");
const b = new LLNode("b");
const c = new LLNode("c");
const d = new LLNode("d");

a.next = b;
b.next = c;
c.next = d;

describe("Linked List tests", () => {
  describe("Prints the list in order", () => {
    it("Iteratively", () => {
      expect(algos.printLinkedListIterative(a)).toEqual("a,b,c,d");
    });
    it("Recursively", () => {
      expect(algos.printLinkedListIterative(a)).toEqual("a,b,c,d");
    });
  });
  describe("Values in order", () => {
    it("Iteratively", () => {
      expect(algos.valuesIteratively(a)).toEqual(["a", "b", "c", "d"]);
    });
    it("Recursively my version", () => {
      expect(algos.valuesRecusrivelyMine(a)).toEqual(["a", "b", "c", "d"]);
    });
    it("Recursively their version", () => {
      expect(algos.valuesRecusrivelyTheirs(a)).toEqual(["a", "b", "c", "d"]);
    });
  });
  describe("Sum list", () => {
    const a = new LLNode(1);
    const b = new LLNode(3);
    const c = new LLNode(-2);
    const d = new LLNode(7);

    a.next = b;
    b.next = c;
    c.next = d;

    it("Iteratively", () => {
      expect(algos.sumListIteratively(a)).toEqual(9);
    });
    it("Recursively", () => {
      expect(algos.sumListRecursivelyMine(a)).toEqual(9);
    });
  });
  describe("Linked List Find", () => {
    it("Iteratively", () => {
      expect(algos.findIteratively(a, "c")).toBeTruthy();
      expect(algos.findIteratively(a, "f")).toBeFalsy();
    });
    it("Recursively Mine", () => {
      expect(algos.findRecursivelyMine(a, "c")).toBeTruthy();
      expect(algos.findRecursivelyMine(a, "f")).toBeFalsy();
    });
  });
  describe("Get Node Value", () => {
    it("Iteratively", () => {
      expect(algos.getNodeValueIteratively(a, 2)).toEqual("c");
    });
    it("Recursively", () => {
      expect(algos.getNodeValueRecursivelyMine(a, 2)).toEqual("c");
    });
    it("Recursively", () => {
      expect(algos.getNodeValueRecursivelyTheirs(a, 2)).toEqual("c");
    });
  });
  describe("Reverse Linked List", () => {
    it("Iteratively", () => {
      expect(algos.reverseLinkedListIterative(a)).toEqual(d);
    });
    it("Recursively", () => {
      const a = new LLNode("a");
      const b = new LLNode("b");
      const c = new LLNode("c");
      const d = new LLNode("d");

      a.next = b;
      b.next = c;
      c.next = d;
      expect(algos.reverseLinkedListRecursive(a)).toEqual(d);
    });
  });
  describe("Zipper list", () => {
    it("Iteratively", () => {
      const a = new LLNode("a");
      const b = new LLNode("b");
      const c = new LLNode("c");

      const x = new LLNode("x");
      const y = new LLNode("y");
      const z = new LLNode("z");

      a.next = b;
      b.next = c;

      x.next = y;
      y.next = z;
      /*
        a > b > c
        x > y > z
  
        a > x > b > y > c > z
       */
      const zippered = algos.zipperListIteratively(a, x);
      console.log({ zippered });
      const list = algos.valuesIteratively(zippered);
      console.log({ list });
      expect(list).toEqual(["a", "x", "b", "y", "c", "z"]);
    });
    // it("Recursively", () => {
    //   expect(algos.zipperListRecursively(a)).toEqual(d);
    // });
  });
});
