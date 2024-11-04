import mergeObjects from "@/utils/merge-objects";

describe('MergeObject', () => {
	
	test('Merging to simple object', () => {
		expect(mergeObjects({ a: 1 }, { b: 2}))
		.toEqual({ a: 1, b: 2})
	})
	test('Merging to simple object with deeo values', () => {
		expect(mergeObjects({ a: 1, c: {a: 1} }, { b: 2, c: {b: 2}}))
		.toEqual({ a: 1, b: 2, c: {a: 1, b: 2}})
	})
	test('Merge deep value', () => {
		expect(mergeObjects({}, {a: {a: {a: {a: 1}}}})).toEqual({a: {a: {a: {a: 1}}}})
		
	})

	test("Init value of property is NULL", () => {

		const value = {
			address: null
		}
		mergeObjects(value, {
			address: { city: 'Mogilev' }
		})

		expect(value).toEqual({
			address: {
				city: 'Mogilev'
			}
		})
	})
	
	/**
	 * @description Должно происходить смешивание, а не полное переопределение объектов данных.
	 */
	test("Merging empty source's values with target should has effect.", () => {
		const source = {};
		const target = {
			address: {
				city: {
					name: 11
				}
			}
		}
		mergeObjects(source, target)
		expect(source).toEqual({
			address: {
				city: {
					name: 11
				}
			}
		})

	})
	
	/**
	 * @description Смешивание объекта не должно полностью переопределять объект. Это очень важное поведение, т.к.
	 * мы не заменяем объект, а всего лишь подмешиваем данные.
	 */
	test('Merging with empty target values should not override source', () => {
		const source = { user: { name: "Jack" } }
		const target = { user: {} }
		
		expect(mergeObjects(source, target)).toEqual({
			user: {
				name: "Jack"
			}
		})
	})
	
	test('Simple null value', () => {
		
		let a = {};
		mergeObjects(a, {sub: {name: null}})
		expect(a).toEqual({
			sub: {name: null}
		})
		
	})

	
})
