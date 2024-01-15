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

    // Valid usernames
    expect(validate._parse("Va").output).toBe("Va");
    expect(validate._parse("Valid.Name123").output).toBe("Valid.Name123");
    expect(validate._parse("Username_With_24_Charact").output).toBe(
      "Username_With_24_Charact"
    );

    // Invalid due to ending with a period
    expect(validate._parse("InvalidName.").issues).toBeTruthy();

    // Invalid due to being too short
    expect(validate._parse("I").issues).toBeTruthy();

    // Invalid due to exceeding 24 characters
    expect(
      validate._parse("TooLongUsernameExceeding24Chars").issues
    ).toBeTruthy();

    // Invalid due to containing special characters
    expect(validate._parse("Invalid*Name").issues).toBeTruthy();
  });

  test("should return custom error message", () => {
    const customError = "Custom error message";
    const validate = tiktok(customError);
    // Testing with a custom error message
    expect(validate._parse("Invalid*Name").issues?.[0].message).toBe(
      customError
    );
  });
});
