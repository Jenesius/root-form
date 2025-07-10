import FormEvent from "@/classes/events/form-event";
import Form from "@/classes/RootForm";
import {IFormSetValuesOptions, IValues} from "@/types";
import grandObject from "@/utils/grand-object";
import concatName from "@/utils/concat-name";
import getPropFromObject from "@/utils/get-prop-from-object";
import bypassObject from "@/utils/bypass-object";
import copyObject from "@/utils/copy-object";
import insertByName from "@/utils/insert-by-name";
import mergeObjects from "@/utils/merge-objects";
import isIterablePoint from "@/utils/is-iterable-point";
import * as console from "node:console";
import hasNameInObject from "@/utils/has-name-in-object";
import deleteByName from "@/utils/delete-by-name";

export default class FormEventValue extends FormEvent {
	
	#values: IValues = {};
	
	private set values(data: any) {
		this.#values = grandObject(data);
	}
	get values() {
		return this.#values;
	}
	
	/**
	 * @description Параметры, которые используется при установке значения в форме.
	 */
	options: Partial<IFormSetValuesOptions> = {}
	constructor(target: Form, values: any, options: Partial<IFormSetValuesOptions> = {}) {
		super({
			mode: 'bubble',
			target,
			name: 'value',
		});
		
		this.values = values;
		
		this.options = options;
	}
	
	getValueByName() {
		if (this.mode === 'capture' ) throw new Error('');
	}
	updateValueByName() {
		if (this.mode === 'capture' ) throw new Error('');
	}
	
	deleteValueByName() {
		if (this.mode === 'capture' ) throw new Error('');
	}
	
	getCompareResult(form: Form) {
		const sourceName = FormEventValue.getSourceName(this, form);
		
		const projectionOfChanges = bypassObject(this.values);
		const oldFormValues = copyObject(form.values);
		const fieldsForCheck = new Set<string>()
		
		
		
		const event = this;
		const test = {
			get value() {
				return event.options.change ? form.changes : form.pureValues
			},
			set: (v: any) => {
				if (this.options.change) form.changes = v;
				else form.pureValues = v
			}
		}
		
		
		
		// Очистка значений
		if (this.options.clean) {
			sourceName ? insertByName(test.value, sourceName, {}) : test.set({});
		}
		
		// Подготовка для сливания. Если нет объект в который будем сливать значения - его необходимо создать
		if (sourceName && !isIterablePoint(getPropFromObject(test.value, sourceName)))
			insertByName(test.value, sourceName, {});
		
		
		const sourceValues = sourceName ? getPropFromObject(test.value, sourceName) : test.value;
		mergeObjects(sourceValues, this.values);
		
		{
			if ( !this.options.change ) {
				const projection = bypassObject(this.values);
				console.log(projection);
				projection.forEach(elem => deleteByName(form.changes, concatName(sourceName, elem.name)))
			}
		}
		
		console.log("Changes", form.changes);
		console.log("Values", form.values);
		console.log("PureValues", form.pureValues)
		
		// понять, что изменилось
		// можно пройтись по всем полями из this.values и затем их проверить
		// Но в случае с options.clean нужно и все поля, которые были в очистке
		
	}
	/**
	 * @description Получение исходного пути для которого вызывается изменение. Зависит и от options.target, и от
	 * местоположения элемента, на котором было вызвано изменения значения.
	 */
	static getSourceName(event: FormEventValue, form: Form) {
		const path = FormEvent.getPath(form, event)
		// Строковый путь (разделённый точкой) через который прошёл event до текущей формы.
		const executedFrom = concatName(...path.reverse().map(item => item.name));
		// Исходное строковое положение для которого необходимо установить значения
		const sourceName = concatName(executedFrom, event.options.target);
		
		return sourceName;
	}
}