// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunc = Function;

export const curry = (f: AnyFunc) => {
  return function innerFunc(...args0: (string | number)[]) {
    if (args0.length >= f.length) {
      args0.length = f.length;
      return f(...args0);
    } else {
      return function (...args1: (string | number)[]): AnyFunc {
        return innerFunc(...args0, ...args1);
      };
    }
  };
};
