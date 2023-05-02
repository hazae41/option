import { Option } from "./option.js";

async function doNoRun(option: Option<string>) {
  const result = await option.map(async x => x + "hello")
}