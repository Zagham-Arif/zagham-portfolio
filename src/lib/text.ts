/** The first sentence of a paragraph: a period followed by a space ends it. */
export function firstSentence(text: string): string {
  const end = text.search(/\.\s/);
  return end === -1 ? text : text.slice(0, end + 1);
}
