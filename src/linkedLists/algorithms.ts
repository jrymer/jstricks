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
  // O(n)
  if (!head) return;

  let current: LLNode | undefined = head;
  let sum = 0;

  while (current !== undefined) {
    sum += current.val as number;
    current = current.next;
  }

  return sum;
};

export const sumListRecursivelyMine = (head: LLNode | undefined): number => {
  // O(n)
  // Same as his version
  if (!head) return 0;

  return (head.val as number) + sumListRecursivelyMine(head.next);
};

/**
 * Linked List find = return true or false if the value is contained in the list
 */
export const findIteratively = (head: LLNode, value: string) => {
  // O(n)
  if (!head) return false;

  let current: LLNode | undefined = head;

  while (current !== undefined) {
    if ((current.val as string) === value) {
      return true;
    }
    current = current.next;
  }
  return false;
};

export const findRecursivelyMine = (
  head: LLNode | undefined,
  value: string
): boolean => {
  // O(n)
  if (!head) return false;

  return (
    (head.val as string) === value || findRecursivelyMine(head.next, value)
  );
};

export const getNodeValueIteratively = (head: LLNode, index: number) => {
  // O(n)
  if (!head) return;

  let current: LLNode | undefined = head;
  let currentIndex = 0;

  while (current !== undefined) {
    if (currentIndex === index) {
      return current.val;
    }
    current = current.next;
    currentIndex++;
  }
};

const fillGetNodeValues = (
  head: LLNode | undefined,
  values: string[]
): string[] | undefined => {
  if (!head) return [];
  values.push(head.val as string);
  return fillGetNodeValues(head.next, values);
};

export const getNodeValueRecursivelyMine = (head: LLNode, index: number) => {
  if (!head) return;

  const values: string[] = [];
  fillGetNodeValues(head, values);

  return values[index];
};

export const getNodeValueRecursivelyTheirs = (
  head: LLNode | undefined,
  index: number
): string | undefined => {
  /**
   * O(n)
   * Head node = index 0
   * If we just decrease the index each time, we will eventually end up at the right node
   */
  if (!head) return;
  if (index === 0) return head.val as string;

  return getNodeValueRecursivelyTheirs(head.next, index - 1);
};
