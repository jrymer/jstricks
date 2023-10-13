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
      expect(algos.valuesIteratively(a)).toEqual(9);
    });
    it("Recursively my version", () => {
      expect(algos.valuesRecusrivelyMine(a)).toEqual(9);
    });
    // it("Recursively their version", () => {
    //   expect(algos.valuesRecusrivelyTheirs(a)).toEqual(["a", "b", "c", "d"]);
    // });
  });
});
