import { x } from "../valibot";

describe("x", () => {
  test("X (formerly Twitter) handle validation", () => {
    const validate = x();
    const value1 = "ValidName123";
    expect(validate._parse(value1).output).toBe(value1);

    expect(validate._parse("TooLongUsername12345").issues).toBeTruthy();
    expect(validate._parse("Invalid*Name").issues).toBeTruthy();
  });

  test("should return custom error message", () => {
    const error = "Custom error message";
    const validate = x(error);
    expect(validate._parse("Invalid*Name").issues?.[0].message).toBe(error);
  });
});
