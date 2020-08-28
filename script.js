import Task from "./task.js";
import TaskManager from "./task-manager.js";

// Begin DOM manipulation block
document.addEventListener("DOMContentLoaded", function () {
	const taskManager = new TaskManager();
	renderTasks();

	function renderTasks() {
		//clear any exsisting HTML
		const itemsContainer = document.getElementById("tableBody");
		const taskList = taskManager.getAllTasks();

		itemsContainer.innerHTML = taskList;

		// Look for New Task button being clicked

		let createBtn = document.querySelector(".createNewTaskBtn");

		// loop over deletions and attach click event listener
		createBtn.addEventListener(
			"click",
			function (event) {
				// change createTaskBtn button to be called Create new task

				createTaskBtn.innerText = "Create new task";

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

					taskManager.deleteTask(deleteId);

					renderTasks();
				},
				false
			);
		});

		// Look for Update button being clicked

		let updateTask = document.querySelectorAll(".updateTaskBtn");
		console.log(updateTask);

		// loop over updates and attach click event listener
		const updateSetup = Array.prototype.filter.call(updateTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					// change createTaskBtn button to be called update task

					createTaskBtn.innerText = "Update task";

					let targetId = event.target.value;

					let editId = document.querySelector(".taskId");
					let editName = document.querySelector(".taskName");
					let editStatus = document.querySelector(".taskStatus");
					let editDescription = document.querySelector(".taskDescription");
					let editAssignedTo = document.querySelector(".taskAssignedTo");
					let editDueDate = document.querySelector(".taskDueDate");

					// get task from array and set values

					const task = taskManager.tasks.find((t) => t.id === targetId);
					console.log("task:", task);

					editId.value = task.id;
					editName.value = task.name;
					editStatus.value = task.status;
					editDescription.value = task.description;
					editAssignedTo.value = task.assignedTo;
					editDueDate.value = task.dueDate;

					renderTasks();
				},
				false
			);
		});
	}
	// Validation code for disabling form submissions if there are invalid fields

	// Fetch all the forms we want to apply custom Bootstrap validation styles to

	const forms = document.getElementsByClassName("needs-validation");

	// Loop over them and prevent submission if not valid input
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

					// Look for taskId if there it is an update of the task

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
					} else {
						// Look for taskId if not there it is an add task

						taskManager.addTask(status, name, description, assignedTo, dueDate);
						renderTasks();
					}
				}
			},
			false
		);
	});
});
