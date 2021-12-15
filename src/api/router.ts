/**
 *
 * @param date 用户名称
 * @returns 动态路由
 */
export function getAsyncRoutes(date: object): Promise<any> {
	return new Promise((resolve, reject) => {
		resolve({ info: [] })
	})
}
