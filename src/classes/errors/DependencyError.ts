import FormError from "./FormError";

export default class DependencyError extends FormError{
	static NotFound() {
		return new DependencyError('Dependency not founded in queue.')
	}
	static WithoutName() {
		return new DependencyError('Невозможно добавить зависимость без name.')
	}
}