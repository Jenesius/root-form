import Form from "./RootForm";
import DependencyError from "./errors/DependencyError";

/**
 * @description Класс для работы с зависимыми элементами формы. Основная задача - поддержание целостности.
 * При добавлении элемента устанавливается значение родителя, а также добавление в массив.
 * При удалении значение родителя сбрасывается.
 * */
export default class DependencyQueue<T extends (DependencyItem & Record<string, any>)> {
	private array: T[] = []
	private readonly root: Form

	constructor(form: Form) {
		this.root = form;
	}

	add(object: T) {

		if (!object.name) throw DependencyError.WithoutName()

		object.parent = this.root;
		this.array.push(object);

	}
	remove(object: T) {
		if (!this.array.includes(object)) throw DependencyError.NotFound()
		
		object.parent = undefined;
		
		this.array.splice(
			this.array.indexOf(object), 1
		)
	}
	find(expression: (elem: T, index: number) => boolean) {
		return this.array.find(expression);
	}
	forEach(callback: (elem: T) => void) {
		this.array.forEach(callback);
	}
	get length() {
		return this.array.length;
	}
	includes(elem: T) {
		return this.array.includes(elem)
	}
	reduce<U>(callback: (acc: U, elem: T) => U, defaultAcc: U) {
		return this.array.reduce(callback, defaultAcc)
	}
}

export interface DependencyItem {
	parent?: Form | undefined,
	name?: string,
	dispatchEvent?: any
}