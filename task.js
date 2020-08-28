// Task Class

export default class Task {
	constructor(id, status, name, description, assignedTo, dueDate) {
		this.id = id;
		this.status = status;
		this.name = name;
		this.description = description;
		this.assignedTo = assignedTo;
		this.dueDate = dueDate;
	}
}
