// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunc = Function;

export function sum(arg?: number): AnyFunc {
  const rslt: number = arg ? +arg : 0;

  const innerSum: AnyFunc = (argInner: number): AnyFunc => {
    let innerRslt = rslt;

    const anotherInnerSum = (argInner1: number): AnyFunc => {
      innerRslt += argInner1 ? +argInner1 : 0;
      return anotherInnerSum;
    };

    anotherInnerSum.valueOf = (): number => {
      return innerRslt + (argInner ? +argInner : -0);
    };
    anotherInnerSum.toString = (): string => {
      return String(innerRslt + (argInner ? +argInner : 0)).toString();
    };
    return anotherInnerSum;
  };

  innerSum.valueOf = (): number => {
    return rslt;
  };
  innerSum.toString = (): string => {
    return String(rslt).toString();
  };

  return innerSum;
}
