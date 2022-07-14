export function semverSort(arr: string[]) {
  return arr.sort((first: string, second: string) => {
    const f: string[] = first.split(".");
    const s: string[] = second.split(".");
    const length: number = f.length > s.length ? f.length : s.length;
    for (let idx = 0; idx < length; idx++) {
      if (+f[idx] ^ +s[idx]) {
        return +(f[idx] || "0") < +(s[idx] || "0") ? -1 : 1;
      }
    }
    return 0;
  });
}
