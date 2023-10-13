import { LLNode } from "./Node";

export const printLinkedListIterative = (head: LLNode) => {
  if (!head) return null;

  let current: LLNode | undefined = head;
  const list: string[] = [];

  while (current !== undefined) {
    list.push(current.val as string);
    current = current.next;
  }

  return list.join(",");
};

export const printLinkedListedRecursive = (head?: LLNode): string | null => {
  if (!head) return null;
  printLinkedListedRecursive(head.next);
  return head.val as string;
};

export const valuesIteratively = (head: LLNode) => {
  if (!head) return;

  let current: LLNode | undefined = head;
  const values: string[] = [];

  while (current !== undefined) {
    values.push(current.val as string);
    current = current.next;
  }

  return values;
};

export const valuesRecusrivelyMine = (head: LLNode | undefined): string[] => {
  if (!head) return [];
  return [head.val as string, ...valuesRecusrivelyMine(head.next)];
};

const fillValues = (head: LLNode | undefined, values: string[]) => {
  if (!head) return [];
  values.push(head.val as string);
  fillValues(head.next, values);
};
export const valuesRecusrivelyTheirs = (head: LLNode) => {
  /**
   * Note that the benefit of splitting the recusrion out into its own function and little section is that in my version, im creating a new array every time, and in this version, we just push values onto the existing values array giving O(n) runtime where as mine is O(n^2)
   */
  const values: string[] = [];
  fillValues(head, values);
  return values;
};

export const sumListIteratively = (head: LLNode) => {
  return 0;
};

export const sumListRecursivelyMine = (head: LLNode) => {
  return 0;
};
export const sumListRecursivelyTheirs = (head: LLNode) => {
  return 0;
};
