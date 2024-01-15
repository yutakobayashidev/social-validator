import {
  type BaseValidation,
  ErrorMessage,
  actionIssue,
  actionOutput,
} from "valibot";

export type XValidation<TInput extends string> = BaseValidation<TInput> & {
  type: "tiktok";
  requirement: RegExp;
};

export function tiktok<TInput extends string>(
  message: ErrorMessage = "Usernames can only contain letters, numbers, underscores, and periods. However, periods can't be added to the end of a username."
): XValidation<TInput> {
  return {
    type: "tiktok",
    async: false,
    message,
    requirement: /^[a-zA-Z0-9_.]{2,24}(?<!\.)$/,
    _parse(input) {
      return !this.requirement.test(input)
        ? actionIssue(this.type, this.message, input, this.requirement)
        : actionOutput(input);
    },
  };
}
