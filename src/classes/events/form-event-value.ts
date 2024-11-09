import FormEvent from "@/classes/events/form-event";
import Form from "@/classes/RootForm";
import {IFormSetValuesOptions, IValues} from "@/types";
import grandObject from "@/utils/grand-object";
import concatName from "@/utils/concat-name";
import getPropFromObject from "@/utils/get-prop-from-object";
import {compareDifference, compareMergeChanges} from "@/utils/compare-changes";
import bypassObject from "@/utils/bypass-object";
import copyObject from "@/utils/copy-object";
import insertByName from "@/utils/insert-by-name";
import * as console from "node:console";
import isEmptyObject from "@/utils/is-empty-object";
import mergeObjects from "@/utils/merge-objects";
import hasNameInObject from "@/utils/has-name-in-object";
import isIterablePoint from "@/utils/is-iterable-point";

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
		const oldValues = copyObject(this.values);
		
		// Очистка значений
		if (this.options.clean) {
			sourceName ? insertByName(form.values, sourceName, {}) : form.values = {};
		}
		// Подготовка для сливания. Если нет объект в который будем сливать значения - его необходимо создать
		if (!!sourceName && (!hasNameInObject(form.values, sourceName) || !isIterablePoint(getPropFromObject(form.values, sourceName))))
			insertByName(form.values, sourceName, {});
		
		const sourceValues = sourceName ? getPropFromObject(form.values, sourceName) : form.values;
		mergeObjects(sourceValues, this.values);
		
		
		
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