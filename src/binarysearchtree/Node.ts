export class BSTNode {
  val: string;
  left?: BSTNode;
  right?: BSTNode;

  constructor(val: string) {
    this.val = val;
    this.left = undefined;
    this.right = undefined;
  }
}
