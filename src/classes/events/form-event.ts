import RootForm from "../RootForm";
import {IFormEventMode, IFormEventOptions} from "@/types";

export default class FormEvent {
	name: string
	mode: IFormEventMode;
	timestamp: number
	target: RootForm
	stopped: boolean = false;
	
	stop() {
		this.stopped = true;
	}
	
	constructor(options: IFormEventOptions) {
		this.mode = options.mode;
		this.target = options.target;
		
		this.name = options.name;
		this.timestamp = Date.now();
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
	
	static getPath(sourceForm: RootForm, event: FormEvent) {
		const path: RootForm[] = [event.target];
		let target = event.target;
		
		while (target && target.parent && target.parent !== sourceForm) {
			path.push(target.parent);
			target = target.parent;
		}
		
		return path;
	}
}


/**
 * @development
 * @param form
 */
function isNotAutonomicForm(form: RootForm) {
	return !form.parent;
}