export class BSTNode {
  val: string | number;
  left?: BSTNode;
  right?: BSTNode;

  constructor(val: string | number) {
    this.val = val;
    this.left = undefined;
    this.right = undefined;
  }
}
