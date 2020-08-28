import Task from "./task.js";
// Task Manager Class

export default class TaskManager {
	constructor() {
		// get tasks form local storage or set to empty array
		this.tasks = JSON.parse(localStorage.getItem("mytasks")) || [];
		// get current id form local storage or set to 1
		this.currentId = parseInt(localStorage.getItem("currentId")) || 1;
		localStorage.setItem("currentId", this.currentId);
	}

	// Build HTML and add to table Method

	getAllTasks() {
		let html = "";

		if (this.tasks.length) {
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
		const task = new Task(
			`task` + this.currentId++,
			status,
			name,
			description,
			assignedTo,
			dueDate
		);

		// push new task onto the tasks array
		this.tasks.push(task);

		//add to local storage
		localStorage.setItem("currentId", this.currentId);
		let lsTasks = JSON.parse(localStorage.getItem("mytasks")) || [];
		lsTasks.push(task);
		localStorage.setItem("mytasks", JSON.stringify(lsTasks));
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

				let lsTasks = JSON.parse(localStorage.getItem("mytasks"));
				console.log("lsTasks:", lsTasks);
				lsTasks.splice(i, 1);
				localStorage.setItem("mytasks", JSON.stringify(lsTasks));

				break;
			}
		}
	}

	// Update task Method

	updateTask(id, status, name, description, assignedTo, dueDate) {
		let updated_id = "";

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

				let lsTasks = JSON.parse(localStorage.getItem("mytasks"));
				lsTasks[i].status = status;
				lsTasks[i].name = name;
				lsTasks[i].description = description;
				lsTasks[i].assignedTo = assignedTo;
				lsTasks[i].dueDate = dueDate;
				localStorage.setItem("mytasks", JSON.stringify(lsTasks));
				break;
			}
		}
		return updated_id;
	}
}
