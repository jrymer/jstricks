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
