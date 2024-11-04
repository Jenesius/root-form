import {IFormSetValuesOptions, IRootFormOptions} from "../types";
import FormEvent from "./form-event";
import DependencyQueue from "./DependencyQueue";
import handleValue from "@/handlers/handle-value";

export default class Form {
	name?: string
	parent?: Form
	get autonomic() {
		return true;
	}
	
	values:any = {}
	
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
		const event = FormEvent.createEvent({
			type: "value",
			mode: 'bubble',
			target: this,
			name: 'value',
			data: values
		});
		this.dispatchEvent(event);
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


