// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Задача состоит в том что написать калькулято для натуральных чисел, но только на типах!
// Ниже приведена заготовка
// Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
// Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

type Equals<A, B> = A extends B ? (B extends A ? "success" : never) : never;

//not my func (not to guessed myself(( it's function is a clue for whole calculator))
type MakeStructFromNumber<
  A extends number,
  FLAG extends boolean,
  RSLT extends number[] = []
> = RSLT["length"] extends A
  ? RESULT<RSLT, FLAG>
  : MakeStructFromNumber<A, FLAG, [...RSLT, RSLT["length"]]>;

//my auxilary functions
type RESULT<A extends number[], FLAG extends boolean = true> = FLAG extends true
  ? A[number]
  : A;
type CHECK<UNION1, UNION2, ARRAY extends number[]> =
  | UNION1
  | UNION2 extends UNION2
  ? [...ARRAY, 0]
  : ARRAY;
type CHECK_<UNION1, UNION2, ARRAY extends number[]> =
  | UNION1
  | UNION2 extends UNION2
  ? ARRAY
  : [...ARRAY, 0];

type SUB_UNION<A extends number, B extends number> = Exclude<
  MakeStructFromNumber<B, true>,
  MakeStructFromNumber<A, true>
>;
type SUB_RSLT<ARRAY extends number[], FLAG extends boolean> = FLAG extends true
  ? ARRAY["length"]
  : ARRAY;
type DIV_RSLT<
  A extends number,
  B extends number,
  RSLT1 extends number[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RSLT2 extends any[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RSLT3 extends any[] = []
> = RSLT2["length"] extends 0
  ? RSLT3["length"]
  : DIV_RSLT<
      A,
      B,
      [...RSLT1, 0],
      SUB<A, RSLT2["length"], false>,
      CHECK_<RSLT2["length"], MakeStructFromNumber<A, true>, RSLT3>
    >;

//"low-level" math commands
type ADD<
  A extends number,
  B extends number,
  FLAG extends boolean = true
> = FLAG extends true
  ? [
      ...MakeStructFromNumber<A, false>,
      ...MakeStructFromNumber<B, false>
    ]["length"]
  : [...MakeStructFromNumber<A, false>, ...MakeStructFromNumber<B, false>];
type SUB<
  A extends number,
  B extends number,
  FLAG extends boolean = true,
  RSLT1 extends number[] = [],
  RSLT2 extends number[] = []
> = RSLT1["length"] extends B
  ? SUB_RSLT<RSLT2, FLAG>
  : SUB<
      A,
      B,
      FLAG,
      [...RSLT1, 0],
      CHECK<RSLT1["length"], SUB_UNION<A, B>, RSLT2>
    >;
type MUL<
  A extends number,
  B extends number,
  RSLT1 extends number[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RSLT2 extends any[] = []
> = RSLT1["length"] extends B
  ? RSLT2["length"]
  : MUL<A, B, [...RSLT1, 0], [...ADD<A, 0, false>, ...RSLT2]>;
type DIV<
  A extends number,
  B extends number,
  RSLT extends number[] = []
> = RSLT["length"] extends B
  ? DIV_RSLT<A, B, [], RSLT>
  : DIV<A, B, [...RSLT, 0]>;

//A and B are natural integral numbers [0, 1, 2, 3 ...)

//"hight-level" math commands for otus tests passing
//rslt = A + B
type Add<A extends number, B extends number> = ADD<B, A>;
//rslt = A - B
type Subtract<A extends number, B extends number> = SUB<B, A>;
//rslt = A * B
type Multiply<A extends number, B extends number> = MUL<B, A>;
//rslt = Math.trunc(A / B)
type TruncatedDivision<A extends number, B extends number> = DIV<B, A>;

//otus tests
export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type TwoMinusOneTest = Equals<Subtract<2, 1>, 1>;

//my tests ("hi-level" ops)
export type TwoMulThreeTest = Equals<Multiply<2, 3>, 6>;
export type SixDivTwoTest = Equals<TruncatedDivision<6, 2>, 3>;

//my tests ("low-level" ops)
type addResult = ADD<5, 8>; //13
type subResult = SUB<4, 12>; //8
type mulResult = MUL<3, 9>; //27
type divResult = DIV<2, 30>; //15
type divResultTruncated = DIV<4, 29>; //7 (float part was truncated)
//type divResultRunTimeErr = DIV<0, 2>; //if uncommented then runtime error while types calculating is occured
