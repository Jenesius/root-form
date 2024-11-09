import concatName from "./concat-name";
import isIterablePoint from "./is-iterable-point";
import splitName from "./split-name";
import isEmptyObject from "@/utils/is-empty-object";

/**
 * @description Функция проходит по всем конечным элементам объекта.
 * @return Array of {path: string[], value: any}
 * @example
 * { person: { profile: { head: { mouth: 1, eyes: 2 } } } }
 * Result:
 * [
 *   {
 *     path: ['person', 'profile', 'head', 'mouth'],
 *     value: 1
 *   },
 *   {
 *     path: ['person', 'profile', 'head', 'eyes'],
 *     value: 2
 *   }
 * ]
 */
export default function bypassObject(object: any): BypassItem[] {
	const array:BypassItem[] = [];

	step(array, object);

	return array
}

/**
 *
 * @param array
 * @param sourceValue Исходное значение, для которого выполняет процесс прохода.
 * @param parentPath Массив составных имен к которым относится данное поле(на текущем шаге)
 */
function step(array: BypassItem[], sourceValue: any, parentPath: string[] = []): void {
	// Если с самого начала нам пришло простое значение - сразу выходим
	if (!isIterablePoint(sourceValue) ) return;
	
	Object.keys(sourceValue)
	.forEach(key => {

		const parsedKey = splitName(key);
		
		const path = [...parentPath, ...parsedKey]; // Step path
		const value = sourceValue[key];	  // Step value
		
		if (!isIterablePoint(value)) {
			array.push({
				path,
				value: value,
				name: concatName(...path),
				set: (newValue) => sourceValue[key] = newValue
			})
			return;
		}
		step(array, value, path)
	})
}

interface BypassItem {
	value: any,
	path: string[],
	name: string,
	set: (x: any) => void
}





