import { Greeter } from "../src/greet";

test("hello 名前", () => {
  expect(new Greeter("Taro").getMessage()).toBe("Hello Taro");
});

test("足し算", () => {
  expect(new Greeter("Taro").culc(1, 2)).toBe(3);
});
