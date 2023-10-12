export class LLNode {
  val: string | number;
  next?: LLNode;

  constructor(val: string | number) {
    this.val = val;
    this.next = undefined;
  }
}
