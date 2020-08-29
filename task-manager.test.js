import TaskManager from "./task-manager";

import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
	document.documentElement.innerHTML = html.toString();
});

test(" test number of tasks - should be 1 after adding one task", () => {
	let tm = new TaskManager("#task-modal");
	tm.addTask("status", "name", "description", "dueDate", "assignedTo");
	expect(tm.tasks.length).toBe(1);
});

// Check to see if after add task update task changes name from name1 to name2
test("updateTask should replace old task with new", () => {
	const taskManager = new TaskManager("#task-modal");
	const task1 = taskManager.addTask(
		"status1",
		"name1",
		"description1",
		"assignedTo1",
		"dueDate1"
	);
	const original = taskManager.tasks[1].name;

	const task2 = taskManager.updateTask(
		"task2",
		"status2",
		"name2",
		"description2",
		"assignedTo2",
		"dueDate2"
	);

	const updated = taskManager.tasks[1].name;

	expect(original).not.toBe(updated);
});
// Add a task and delete using the add and delete methods
test("delete should delete task", () => {
	const taskManager = new TaskManager("#task-modal");
	const taskId = taskManager.addTask(
		"status",
		"name",
		"description",
		"assignedTo",
		"dueDate"
	);

	expect(taskManager.tasks.length).toBe(3);

	let delId = taskManager.tasks[2].id;

	taskManager.deleteTask(delId);

	expect(taskManager.tasks.length).toBe(2);
});

test("updateTask should change assignedTo of task", () => {
	const taskManager = new TaskManager("#task-modal");
	const task3 = taskManager.addTask(
		"status3",
		"name3",
		"description3",
		"assignedTo3",
		"dueDate3"
	);

	const originalAssignedTo = taskManager.tasks[2].assignedTo;
	console.log(originalAssignedTo);
	const task4 = taskManager.updateTask(
		"task4",
		"status3",
		"name3",
		"description3",
		"assignedTo4",
		"dueDate3"
	);

	const updatedAssignedTo = taskManager.tasks[2].assignedTo;

	expect(originalAssignedTo).not.toBe(updatedAssignedTo);
});

// test to see if Jest is working
// test("test works", () => {
// 	expect(1).toBe(1);
// });
