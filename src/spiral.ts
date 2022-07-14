export function spiral(arr: number[][]) {
  let result: number[] = [];
  while (arr.length) {
    let rightSide: number[] = [];
    result = [
      ...result,
      ...arr.reduce<number[]>(
        (
          acc: number[],
          curr: number[],
          idx: number,
          arr: number[][]
        ): number[] => {
          if (!idx) {
            arr.length === 1 && arr.shift();
            return acc.concat(curr);
          }
          if (idx === arr.length - 1) {
            arr.shift();
            arr.pop();
            return acc.concat(curr.reverse());
          }
          rightSide = [arr[idx].shift() as number, ...rightSide];
          return acc.concat(curr.pop() as number);
        },
        []
      ),
      ...rightSide,
    ];
  }
  return result;
}
