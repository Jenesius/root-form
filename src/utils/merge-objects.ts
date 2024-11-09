import {IValues} from "../types";
import isIterablePoint from "./is-iterable-point";
import isEmptyObject from "./is-empty-object";
/**
 * @description Сливает второй объект в первый.
 * {a: {b: 1}}, {a: {c: 1}} => {a: {b: 1 , c: 1}}
 * */
export default function mergeObjects(originalValues: IValues, ...newValues: IValues[]){
	function set(o: any, k: string, v: any) { o[k] = v; } // object/key/value
	
	newValues.forEach(objectValue => {
		for( const key in objectValue ) {
			
			const value = objectValue[key];
			
			if (!isIterablePoint(value) && !isEmptyObject(value)) set(originalValues, key, value);
			else {
				// If current value is primitive we need to change it to object.
				if (!isIterablePoint(originalValues[key])) originalValues[key] = {};
				
				mergeObjects(originalValues[key], value);
			}
		}
	})
	
	return originalValues;
}