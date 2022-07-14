// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunc = Function; 

export class Parallel {
  result: number[] = new Array<number>();
  count = 0;

  funcs: AnyFunc[] = new Array<Function>();
  resultSize = 0;

  constructor(count: number) {
    this.count = count;
  }

  getJob(resolve: AnyFunc ) {
    if (this.funcs.length) {
      (this.funcs.shift() as AnyFunc)().then((data: unknown) => {
        this.getJob(resolve);
        this.result.push(data as number);
        if (this.result.length === this.resultSize) {
          resolve(this.result);
        }
        return data;
      });
    }
  }

  async jobs(...args: AnyFunc[]) {
    this.funcs = args;
    this.result = [];
    this.resultSize = args.length;

    return await new Promise((resolve: AnyFunc) => {
      for (let i = 0; i < this.count; i++) {
        args.length && this.getJob(resolve);
      }
    }).then((data: unknown) => {
      return data;
    });
  }
}
