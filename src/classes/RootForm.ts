import {IFormSetValuesOptions, IRootFormOptions, IValues} from "../types";
import FormEvent from "./events/form-event";
import DependencyQueue from "./DependencyQueue";
import handleValue from "@/handlers/handle-value";
import FormEventValue from "@/classes/events/form-event-value";
import getPropFromObject from "@/utils/get-prop-from-object";
import FormError from "@/classes/errors/FormError";
import mergeObjects from "@/utils/merge-objects";
import * as console from "node:console";

export default class Form {
	#changes = {};
	get changes(): any {
		if (this.autonomic) return this.#changes;
		
		const parentChanges = this.parent?.changes;
		if (!this.name) throw FormError.FormWithoutName()
		return getPropFromObject(parentChanges, this.name);
	}
	set changes(v: any) {
		this.#changes = v;
	}
	
	#values = {}
	set values(newValues: IValues) {
		this.#values = newValues;
	}
	get values(): any {
		if (this.autonomic) return mergeObjects({}, this.#values, this.#changes);
		return this.parent?.getValueByName(this.name as string) || {};
	};
	/**
	 * @description Чистые значения формы. Которые изменяются при помощи setValues без опции change.
	 * */
	get pureValues():any {
		if (this.autonomic) return this.#values;
		return getPropFromObject(this.parent?.pureValues, this.name as string) || {}
	}
	set pureValues(pureValues: IValues) {
		this.#values = pureValues;
	}
	
	name?: string
	parent?: Form
	private isAutonomic: boolean | undefined
	get autonomic() {
		// Если нет родителя
		// Если есть родитель, но при этом isAutonomic установлен в значение true
		return !this.parent || this.isAutonomic === true
	}
	set autonomic(value: boolean) {
		this.isAutonomic = value;
	}
	

	
	/**
	 * @description Return true if form includes changes, otherwise false.
	 * */
	get changed(): boolean {
		return !!(
			(this.changes && Object.keys(this.changes).length !== 0)
			|| this.dependencies.find(
				elem =>  (elem instanceof Form && elem.changed)
			)
		);
	}
	


	getValueByName(name: string) {
		return getPropFromObject(this.values, name);
	}
	constructor(options: IRootFormOptions = {}) {
		this.name = options.name;
		this.parent = options.parent;
		
		// Обработчик по умолчанию, для работы со значениями.
		this.on('value', handleValue.bind(this));
		
	}

	
	dependencies = new DependencyQueue(this)
	
	subscribe(element: Form) {
		this.dependencies.add(element);
	}
	
	setValues(values: any, options: Partial<IFormSetValuesOptions> = {}): void {
		const event = new FormEventValue(this, values, options);
		this.dispatchEvent(event);
	}
	/**
	 * @description Method using for change form's values. Current function is mnemonic for
	 * *form.setValues(value, {change: true})* and just using for shortest form.
	 * */
	change(data: any, options: Partial<Omit<IFormSetValuesOptions, "change">> = {}) {
		const changeOption: Partial<IFormSetValuesOptions> = options
		changeOption.change = true;
		this.setValues(data, changeOption);
	}
	
	dispatchEvent(event: FormEvent) {
		// Обработка события на текущем элементе
		this.captureEvent(event);
		// Если обработка события должна продолжиться, то запускаем процесс.
		if (FormEvent.mustDispatchContinue(this, event)) return FormEvent.dispatch(this, event);
	}
	captureEvent(event: FormEvent) {
		// Выполняем обработчики для события по его name
		this.emit(event.name, event);
	}
	
	
	/**
	 * @description Тестовый блок, для работы с событиями
	 * START
	 */
	handlers: Record<string, any[]> = {}
	on(eventName: string, handler: any) {
		if (!this.handlers[eventName]) this.handlers[eventName] = [];
		this.handlers[eventName].push(handler);
	}
	emit(eventName: string, data: any) {
		if (!this.handlers[eventName]) return;
		this.handlers[eventName].forEach(handler => handler(data));
	}
	
	/**
	 * END
	 */
	
}


