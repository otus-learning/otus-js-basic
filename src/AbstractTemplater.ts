export interface AbstractTemplater {
  fromTemplate: (
    template: string,
    data: { [index: string]: any },
    index?: number,
    count?: number
  ) => string;
}
