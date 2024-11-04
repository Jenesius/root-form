import RootForm from "@/classes/RootForm";

export interface IFormSetValuesOptions {
	change: boolean,
	/**
	 * @description Имя целевого объекта для которого был вызван setValues
	 * */
	target: string,
	
	/**
	 * Место, откуда был event вызван. Является результатом работы функции getTargetName();
	 * */
	executedFrom: string
	/**
	 * @description Полностью заменяет предыдущее значение, а не добавляет(не используется примешивание) к нему значений.
	 * */
	clean: boolean
}

export interface IFormEventCreateOptions extends IFormEventOptions{
	data: any
}

export interface IRootFormOptions {
	name?: string,
	parent?: RootForm
}

export type IFormEventMode = 'bubble' | 'capture'
export type IFormEventType = 'value'

export interface IFormEventOptions {
	mode: IFormEventMode,
	type: IFormEventType,
	target: RootForm,
	name: string
}


export interface Values {
	[name: string]: any
}
