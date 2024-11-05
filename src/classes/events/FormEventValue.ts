import FormEvent from "@/classes/form-event";
import Form from "@/classes/RootForm";
import {IFormSetValuesOptions} from "@/types";

export default class FormEventValue extends FormEvent {
	
	constructor(target: Form, values: any, options: Partial<IFormSetValuesOptions> = {}) {
		super({
			mode: 'bubble',
			target,
			name: 'value',
			data: values
		});
		
	}
}