import { Templater } from "./Templater";

describe("test that Templater is a class", () => {
  it("tests that Templater is a function", () => {
    expect(Templater).toBeDefined();
    expect(Templater).toBeInstanceOf(Function);
  });

  it("tests that instance of Templater is created all right", () => {
    expect(new Templater()).toBeInstanceOf(Templater);
  });
});

describe("test that Templater logic is correct", () => {
  it("tests that Templater do it's tasks all right", () => {
    const strIn =
      "{{for arr as data}}{{if index}}{{data.id}}{{for data.items as items}}{{if index != First}}{{items.id}}{{endif}}{{for items.item as item}}{{if item.id != 66}}{{item.id}}{{and index==1}}~{{and {Part}item.name == 0_}}{{item.name}}{{endif}}{{endfor}}{{endfor}}{{endif}}{{endfor}} {{if name}}name={{name}}{{endif}}";
    const strOut =
      " second 77~0_456_b 88 _second_2 77~ 88 _second_3 77~ 88 third 77~0_456_c 88 _third_2 77~ 88 _third_3 77~ 88 name=test";

    const data = {
      arr: [
        {
          items: [
            {
              item: [
                { id: 66, name: "0_123_a" },
                { id: 77, name: "0_456_a" },
                { id: 88, name: "0_789_a" },
              ],
              id: "_first_1",
            },
            {
              item: [
                { id: 66, name: "1_123_a" },
                { id: 77, name: "1_456_a" },
                { id: 88, name: "1_789_a" },
              ],
              id: "_first_2",
            },
            {
              item: [
                { id: 66, name: "2_123_a" },
                { id: 77, name: "2_456_a" },
                { id: 88, name: "2_789_a" },
              ],
              id: "_first_3",
            },
          ],
          id: "first",
        },
        {
          items: [
            {
              item: [
                { id: 66, name: "0_123_b" },
                { id: 77, name: "0_456_b" },
                { id: 88, name: "0_789_b" },
              ],
              id: "_second_1",
            },
            {
              item: [
                { id: 66, name: "1_123_b" },
                { id: 77, name: "1_456_b" },
                { id: 88, name: "1_789_b" },
              ],
              id: "_second_2",
            },
            {
              item: [
                { id: 66, name: "2_123_b" },
                { id: 77, name: "2_456_b" },
                { id: 88, name: "2_789_b" },
              ],
              id: "_second_3",
            },
          ],
          id: "second",
        },
        {
          items: [
            {
              item: [
                { id: 66, name: "0_123_c" },
                { id: 77, name: "0_456_c" },
                { id: 88, name: "0_789_c" },
              ],
              id: "_third_1",
            },
            {
              item: [
                { id: 66, name: "1_123_c" },
                { id: 77, name: "1_456_c" },
                { id: 88, name: "1_789_c" },
              ],
              id: "_third_2",
            },
            {
              item: [
                { id: 66, name: "2_123_c" },
                { id: 77, name: "2_456_c" },
                { id: 88, name: "2_789_c" },
              ],
              id: "_third_3",
            },
          ],
          id: "third",
        },
      ],
      name: "test",
    };

    expect(new Templater().fromTemplate(strIn, data)).toEqual(strOut);
  });
});
