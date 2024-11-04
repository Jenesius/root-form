import RootForm from "@/classes/RootForm";
import FormEvent from "@/classes/form-event";
import mergeObjects from "@/utils/merge-objects";
import grandObject from "@/utils/grand-object";


export default function handleValue(this: RootForm, event: FormEvent) {
	if (!this.autonomic) return;
	
	event.stop();
	/**
	 * SOME this.values manipulation
	 */
	
	this.values = mergeObjects(this.values, grandObject(event.data));
	
	
	// 1. getPropFormObject
	// 2. insertPropInObject
	// 3. deletePropFormObject
	
	/**
	 * values = grandObject(values);
	 *
	 * ПРОВЕРКА НА АВТОНОМНОСТЬ
	 *
	 * event.stop();
	 * const compareResult = compare();
	 *
	 * insertValue();
	 */
	
	// ????
	// Главный вопрос, должна ли здесь форма как-то обрабатывать данные?
	// Или всё возложить на родительскую форму, что было сделано в jenesius-vue-form
	// Нужно подумать за и против.
	// ???

	// Здесь форма, может остановить всплытие.
	// event.stop()
	// В том случае, если она хочет полностью самостоятельно обработать её.
	// Но скорее всего этим должны заниматься обработчики, которые будут попросту запускать данное событие.
	
	/*
	if (!this.autonomic) return;
	
	event.stop();
	this.insertValue(...);
	 */
}