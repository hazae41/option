import { Option } from "./option.js";
import { Some } from "./some.js";

async function doNoRun(option: Option<number>) {
  const mapped = option
    .mapSync(x => x + 2)
    .mapSync(x => x * 2)
    .xor(new Some("hello"))
    .inner
}