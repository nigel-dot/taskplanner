import Task from "./task.js";
import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
	document.documentElement.innerHTML = html.toString();
});

test.todo("something");

// test to see if Jest is working
// test("test works", () => {
// 	expect(1).toBe(1);
// });
