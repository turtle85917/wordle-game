export default (word: string): string[][] => {
  return new Array(word.length).fill(new Array(word.length).fill(""));
}