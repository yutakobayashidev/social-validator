import {
  type BaseValidation,
  ErrorMessage,
  actionIssue,
  actionOutput,
} from "valibot";

export type XValidation<TInput extends string> = BaseValidation<TInput> & {
  type: "x";
  requirement: RegExp;
};

export function x<TInput extends string>(
  message: ErrorMessage = "X (formerly Twitter) handles may only contain up to 15 characters, upper and lower case letters, numbers, and underscores (_)."
): XValidation<TInput> {
  return {
    type: "x",
    async: false,
    message,
    requirement: /^[A-Za-z0-9_]{1,15}$/,
    _parse(input) {
      return !this.requirement.test(input)
        ? actionIssue(this.type, this.message, input, this.requirement)
        : actionOutput(input);
    },
  };
}
