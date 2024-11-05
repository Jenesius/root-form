import RootForm from "@/classes/RootForm";
import mergeObjects from "@/utils/merge-objects";
import grandObject from "@/utils/grand-object";
import FormEventValue from "@/classes/events/FormEventValue";
import FormEvent from "@/classes/form-event";
import concatName from "@/utils/concat-name";


export default function handleValue(this: RootForm, event: FormEventValue) {
	if (!this.autonomic) return;
	event.stop();
	/**
	 * SOME this.values manipulation
	 */
	
	const path = FormEvent.getPath(this, event)
	// Строковый путь (разделённый точкой) через который прошёл event до текущей формы.
	const executedFrom = concatName(...path.reverse().map(item => item.name));

	this.values = mergeObjects(this.values, grandObject({
		[executedFrom]: event.data
	}));
	
	
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