import { generateName } from "./nameGenerator";

describe("tests nameGenerator routines", () => {
  it("tests that generateName function is exist", () => {
    expect(generateName).toBeDefined();
    expect(generateName).toBeInstanceOf(Function);
  });

  it("tests that names are generated randomly", () => {
    const s1 = generateName();
    const s2 = generateName();
    expect(s1).not.toEqual("");
    expect(s2).not.toEqual("");
    expect(s1.match(/.* .*/)).not.toEqual(null);
    expect(s2.match(/.* .*/)).not.toEqual(null);
  });
});
