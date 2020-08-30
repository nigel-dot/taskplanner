// JavaScript to run tests on
import Task from "./task.js";

// Setup HTML
import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
	document.documentElement.innerHTML = html.toString();
});
// Check if task class contructor is working
test(" create an instance of the object and check it ", () => {
	const tasks = new Task(1, 'Todo','name','description','assignedTo','2020-09-01');
	expect(tasks.id).toEqual(1);
	expect(tasks.status).toEqual('Todo');
	expect(tasks.name).toEqual('name');
	expect(tasks.description).toEqual('description');
	expect(tasks.assignedTo).toEqual('assignedTo');
	expect(tasks.dueDate).toEqual('2020-09-01');

});


