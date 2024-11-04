import RootForm from "./RootForm";
import {IFormEventCreateOptions, IFormEventMode, IFormEventOptions, IFormEventType} from "../types";

export default class FormEvent {
	name: string
	type: IFormEventType;
	mode: IFormEventMode;
	timestamp: number
	data: any
	target: RootForm
	stopped: boolean = false;
	
	stop() {
		this.stopped = true;
	}
	
	constructor(options: IFormEventOptions) {
		this.type = options.type;
		this.mode = options.mode;
		this.target = options.target;
		
		this.name = options.name;
		this.timestamp = Date.now();
	}
	
	static createEvent(options: IFormEventCreateOptions): FormEvent {
		const event = new FormEvent(options);
		event.data = options.data;
		return event;
	}
	
	static mustDispatchContinue(form: RootForm, event: FormEvent) {
		return !event.stopped
	}
	
	/**
	 * @description Отправка события. Используется как для всплытия, так и для погружения.
	 * */
	static dispatch(source: RootForm, event: FormEvent, ) {
		
		if (event.mode === 'bubble') {
			if (source.parent)
			source.parent.dispatchEvent(event);
		}
		else {
			source.dependencies.forEach(dep => dep.dispatchEvent(event));
		}
	}
}


/**
 * @development
 * @param form
 */
function isNotAutonomicForm(form: RootForm) {
	return !form.parent;
}