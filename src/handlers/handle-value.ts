import RootForm from "@/classes/RootForm";
import FormEventValue from "@/classes/events/form-event-value";
import * as console from "node:console";


export default function handleValue(this: RootForm, event: FormEventValue) {
	if (!this.autonomic) return;
	event.stop();
	/**
	 * SOME this.values manipulation
	 */
	
	const compareResult = event.getCompareResult(this);
	
	console.log(this.values)
	/*
	this.values = mergeObjects(this.values, grandObject({
		[executedFrom]: event.data
	}));
	
	
	 */
	
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