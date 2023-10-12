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
  it("Prints linked list in order iteratively", () => {
    expect(algos.printLinkedListIterative(a)).toEqual("a,b,c,d");
  });
  it("Prints linked list in order recursively", () => {
    expect(algos.printLinkedListIterative(a)).toEqual("a,b,c,d");
  });
});
