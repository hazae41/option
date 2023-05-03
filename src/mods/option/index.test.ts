import { Option } from "./option.js";
import { Some } from "./some.js";

async function doNoRun(option: Option<number>) {
  const mapped = option
    .mapSync(x => x + 2)
    .mapSync(x => x * 2)
    .zip(new Some("lol"))
    .mapSync(([x, y]) => { })
    .inner
}