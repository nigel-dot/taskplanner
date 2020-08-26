// Task Class

class Task {
	constructor(id, status, name, description, assignedTo, dueDate) {
		this.id = id;
		this.status = status;
		this.name = name;
		this.description = description;
		this.assignedTo = assignedTo;
		this.dueDate = dueDate;
	}
}
// Task Manager Class

class TaskManager {
	constructor() {
		this.tasks = [];
		this.currentId = 1;
		// this.currentId = parseInt(localStorage.getItem("currentId")) || 1;
		// localStorage.setItem("currentId", this.currentId);
	}

	// Build HTML and add to table Method

	getAllTasks() {
		// console.log("get all task method", this.tasks);
		// get tasks from local storage
		//let myNewTasks = JSON.parse(window.localStorage.getItem("mytasks"));
		// if (myNewTasks) {

		// 	for (let i = 0; i < myNewTasks.length; i++) {

		let html = "";
		if (this.tasks.length) {
			console.log("task length:", this.tasks.length);
			this.tasks.forEach(function (task) {
				html += `
				<div class="task">
				<tr>
					<td>${task.status}</td>
					<td>${task.name}</td>
					<td>${task.description}</td>
					<td>${task.assignedTo}</td>
					<td>${task.dueDate}</td>
					<td>
						<button
							type="button"
							class="updateTaskBtn btn btn-outline-warning .btn-sm"
							value="${task.id}"
							data-toggle="modal"
							data-target="#createTaskModal"
						>
							Update
						</button>
						<button
							type="button"
							value="${task.id}"
							class="deleteTaskBtn btn btn-outline-danger .btn-sm"
						>
							Delete
						</button>
					</td>
				</tr>
			</div>
                `;
				const tableBody = document.querySelector("#tableBody");
				const table = document.createElement(`table`);
				const tbody = document.createElement(`tbody`);
				table.appendChild(tbody);
				const range = document.createRange();
				range.selectNodeContents(tbody);
				const taskElement = range.createContextualFragment(html);
				tableBody.append(taskElement);
			});
		} else {
			html = "";
		}
		return html;
	}

	// Add task Method

	addTask(status, name, description, assignedTo, dueDate) {
		// change createTaskBtn button to be called create new task
		//createTaskBtn.innerText = "Create new task";
		const task = new Task(
			`task` + this.currentId++,
			status,
			name,
			description,
			assignedTo,
			dueDate
		);

		console.log("this.currentId:", this.currentId, "this tasks:", this.tasks);
		// push new task onto the tasks array
		this.tasks.push(task);

		//add to local storage
		localStorage.setItem("currentId", this.currentId);
		let myNewTasks = JSON.parse(localStorage.getItem("mytasks")) || [];
		myNewTasks.push(task);
		localStorage.setItem("mytasks", JSON.stringify(myNewTasks));
	}

	// Delete task Method

	// find the array index which contains that id then remove from array
	//  use array.splice method here to delete then do the same as addtask to rendertasks **
	deleteTask(id) {
		for (let i = 0; i < this.tasks.length; i++) {
			// delete from array
			if (this.tasks[i].id === id) {
				this.tasks.splice(i, 1);

				// delete from local storage

				let myNewTasks = JSON.parse(localStorage.getItem("mytasks"));
				console.log("myNewTasks:", myNewTasks);
				myNewTasks.splice(i, 1);
				localStorage.setItem("mytasks", JSON.stringify(myNewTasks));

				break;
			}
		}

		// tasksArray = tasksArray.filter((Task) => Task.id !== id);
		// console.log("Made it to Delete Task method");
		// console.log("task id:", id);

		//task = task.filter((task) => task.id !== id);
	}

	// Update task Method

	updateTask(id, status, name, description, assignedTo, dueDate) {
		let updated_id = "";
		console.log("made it to update task method");

		// console.log("vars", id, status, name, description, assignedTo, dueDate);

		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) {
				// update the array
				this.tasks[i].status = status;
				this.tasks[i].name = name;
				this.tasks[i].description = description;
				this.tasks[i].assignedTo = assignedTo;
				this.tasks[i].dueDate = dueDate;
				updated_id = id;

				//update local storage

				// let myNewTasks = JSON.parse(localStorage.getItem("myTasks"));
				// myNewTasks[i].status = status;
				// myNewTasks[i].name = name;
				// myNewTasks[i].description = description;
				// myNewTasks[i].assignedTo = assignedTo;
				// myNewTasks[i].dueDate = dueDate;
				// localStorage.setItem("mytasks", JSON.stringify(myNewTasks));
				break;
			}
		}
		return updated_id;
	}

	// Filter task Method

	filterTask() {}

	// Gettask by status Method

	changeStatus(id, status) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) {
				// update the array
				this.tasks[i].status = status;
				console.log("made it to change status method");

				//update local storage

				// let myNewTasks = JSON.parse(localStorage.getItem("myTasks"));
				// myNewTasks[i].status = status;

				// localStorage.setItem("mytasks", JSON.stringify(myNewTasks));
				break;
			}
		}
		return status;
	}
}

// Begin DOM manipulation block
document.addEventListener("DOMContentLoaded", function () {
	const taskManager = new TaskManager();
	renderTasks();

	function renderTasks() {
		//clear any exsisting HTML
		const itemsContainer = document.getElementById("tableBody");
		const taskList = taskManager.getAllTasks();
		//itemsContainer.innerHTML = "";
		itemsContainer.innerHTML = taskList;
		// console.log("taskmanger:", taskManager, "Task:", Task);

		// Look for Create task button being clicked

		let createBtn = document.querySelector(".createNewTaskBtn");

		// loop over deletions and attach click event listener
		createBtn.addEventListener(
			"click",
			function (event) {
				let editId = document.querySelector(".taskId");
				let editName = document.querySelector(".taskName");
				let editStatus = document.querySelector(".taskStatus");
				let editDescription = document.querySelector(".taskDescription");
				let editAssignedTo = document.querySelector(".taskAssignedTo");
				let editDueDate = document.querySelector(".taskDueDate");
				editId.value = "";
				editName.value = "";
				editStatus.value = "";
				editDescription.value = "";
				editAssignedTo.value = "";
				editDueDate.value = "";
			},
			false
		);

		// Look for Delete button being clicked

		let deleteBtns = document.querySelectorAll(".deleteTaskBtn");

		// loop over deletions and attach click event listener
		const deleteSetup = Array.prototype.filter.call(deleteBtns, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					let deleteId = event.target.value;
					// console.log(event.target.value);

					taskManager.deleteTask(deleteId);

					renderTasks();
				},
				false
			);
		});

		// Look for Change Status button being clicked

		let changeStatusBtns = document.querySelectorAll(".dropdown-item");

		// loop over change status and attach click event listener
		const changeStatusSetup = Array.prototype.filter.call(
			changeStatusBtns,
			function (el) {
				el.addEventListener(
					"click",
					function (event) {
						// let changeStatusId = event.target.value;
						let changeStatusId = 1;
						let changeStatus = "Review";
						// let changeStatus = document.getElementById(".selectStatus").value;
						//let changeStatus = event.target.value;

						console.log(changeStatusId, changeStatus);

						console.log("change status button clicked");

						taskManager.changeStatus(changeStatusId, changeStatus);

						renderTasks();
					},
					false
				);
			}
		);

		// Look for Update button being clicked

		let updateTask = document.querySelectorAll(".updateTaskBtn");
		console.log(updateTask);

		// loop over updates and attach click event listener
		const updateSetup = Array.prototype.filter.call(updateTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					// change createTaskBtn button to be called update task and Id of button
					//document.getElementById("createTaskBtn").id = "editTaskBtn";
					createTaskBtn.innerText = "Update Task";

					let targetId = event.target.value;

					let editId = document.querySelector(".taskId");
					let editName = document.querySelector(".taskName");
					let editStatus = document.querySelector(".taskStatus");
					let editDescription = document.querySelector(".taskDescription");
					let editAssignedTo = document.querySelector(".taskAssignedTo");
					let editDueDate = document.querySelector(".taskDueDate");
					// grab task from array and set values

					const task = taskManager.tasks.find((t) => t.id === targetId);
					console.log(task);
					editId.value = task.id;
					editName.value = task.name;
					editStatus.value = task.status;
					editDescription.value = task.description;
					editAssignedTo.value = task.assignedTo;
					editDueDate.value = task.dueDate;

					let heditName = "Task Name";
					let heditStatus = "Review";
					let heditDescription = "task description";
					let heditAssignedTo = "assignedto";
					let heditDueDate = "2020-08-13";

					// console.log(
					// 	"Update Task Button Clicked",
					// 	"id:",
					// 	editId,
					// 	"name:",
					// 	editName,
					// 	"status:",
					// 	editStatus,
					// 	"Description:",
					// 	editDescription,
					// 	"AssignedTo:",
					// 	editAssignedTo,
					// 	"DueDate:",
					// 	editDueDate
					// );

					// taskManager.updateTask(
					// 	editId,
					// 	editStatus,
					// 	editName,
					// 	editDescription,
					// 	editAssignedTo,
					// 	editDueDate
					// );

					renderTasks();
				},
				false
			);
		});
	}
	// Validation code for disabling form submissions if there are invalid fields

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.getElementsByClassName("needs-validation");
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function (form) {
		form.addEventListener(
			"submit",
			function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (form.checkValidity() === false) {
					form.classList.add("was-validated");
				} else {
					let status = form.taskStatus.value;
					let name = form.taskName.value;
					let description = form.taskDescription.value;
					let assignedTo = form.taskAssignedTo.value;
					let dueDate = form.taskDueDate.value;
					if (form.taskId.value) {
						taskManager.updateTask(
							form.taskId.value,
							status,
							name,
							description,
							assignedTo,
							dueDate
						);

						renderTasks();
						console.log("got an id");
					} else {
						taskManager.addTask(status, name, description, assignedTo, dueDate);
						renderTasks();
					}
				}
			},
			false
		);
	});
});
