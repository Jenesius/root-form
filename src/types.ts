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
}

export interface IRootFormOptions {
	name?: string,
	parent?: RootForm,
	autonomic?: boolean
}

export type IFormEventMode = 'bubble' | 'capture'

export interface IFormEventOptions {
	mode: IFormEventMode,
	target: RootForm,
	name: string,
	data?: any
}


export interface IValues {
	[name: string]: any
}
