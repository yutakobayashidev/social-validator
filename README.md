# social-validator

(WIP) Simple validation library with tested social account IDs for zod and valibot.

## support social media

- X (Former Twitter)
- FaceBook
- Discord
- TikTok

## Usage

```ts
import { x } from "social-validator/valibot/x";
import { parse } from "valibot";

const data = parse(x, "elonmusk"); // elonmusk
```
