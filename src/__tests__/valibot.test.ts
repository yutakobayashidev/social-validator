import { x } from "../valibot/x";
import { tiktok } from "../valibot/tiktok";

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

describe("tiktok", () => {
  test("TikTok handle validation", () => {
    const validate = tiktok();
    expect(validate._parse("Valid.Name123").output).toBe("Valid.Name123");
    expect(validate._parse("Valid_Name.123").output).toBe("Valid_Name.123");

    // Usernames ending in a period are invalid
    expect(validate._parse("InvalidName.").issues).toBeTruthy();

    // Usernames with too many characters are invalid
    expect(validate._parse("TooLongUsername12345").issues).toBeTruthy();

    // Usernames containing invalid characters are invalid
    expect(validate._parse("Invalid*Name").issues).toBeTruthy();
  });

  test("should return custom error message", () => {
    const customError = "Custom error message";
    const validate = tiktok(customError);
    expect(validate._parse("Invalid*Name").issues?.[0].message).toBe(
      customError
    );
  });
});
