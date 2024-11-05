export default class FormError {
	constructor(message: string) {
	}
	
	static FormWithoutName() {
		return new FormError(`In some cases (when a form is dependent on a parent), the form must have a name.`);
	}
}