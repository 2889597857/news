/**
 * 按照路由中meta下的rank等级升序来排序路由
 * @param arr
 * @returns
 */
export const ascending = (arr: any[]) => {
	return arr.sort((a: any, b: any) => {
		return a?.meta?.rank - b?.meta?.rank
	})
}
/**
 * 过滤meta中showLink为false的路由
 * @param data
 * @returns
 */
export const filterTree = (data: any[]) => {
	const newTree = data.filter(v => v.meta.showLink)
	newTree.forEach(v => v.children && (v.children = filterTree(v.children)))
	return newTree
}
export const increaseIndexes = val => {
	return Object.keys(val)
		.map(v => {
			return {
				...val[v],
				key: v,
			}
		})
		.filter(v => v.meta && v.meta.showLink)
}
