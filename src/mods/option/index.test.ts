import { Option } from "./option.js";

async function doNoRun(option: Option<number>) {
  const mapped = option
    .mapSync(x => x + 2)
    .mapSync(x => x * 2)
    .inner
}