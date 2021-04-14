
// const baseUrl = process.env.NODE_ENV == 'development' ? '/api' : 'http://cloud.ts.huizhuig.com/'; 
 const baseUrl = 'http://cloud.ts.donzhu.com'; 
 // const baseUrl = 'http://api.hengjiyingguan.cn';
 // const baseUrl = 'https://api.btcff.net'; 
// 带Token请求

const httpTokenRequest = (path, option = {}) => {
	const { method = 'GET',params,data } = option ;
	let token = uni.getStorageSync('token');
	
    //此token是登录成功后后台返回保存在storage中的
    let httpDefaultOpts = {
        url: baseUrl+path,
        data: method == 'GET'? params : data,
        method: method,
        header: {
			'Authorization': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
		 
        uni.request(httpDefaultOpts).then(
            (res) => {
				// console.log(res)
				if (res[0]) {
					uni.showToast({
						title: '服务错误',
						icon: 'none'
					})
				}
				if (res[1].header.Authorization) {
					uni.setStorage({
						key: 'token',
						data: res[1].header.Authorization
					});
				}
				if (res[1].header.authorization) {
					uni.setStorage({
						key: 'token',
						data: res[1].header.authorization
					});
				}
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
				if (res[1].data.code == 403 && curRoute != 'pages/userLogin/userLogin') {
					uni.navigateTo({
						url:'/pages/userLogin/userLogin'
					});
				}
                resolve(res[1].data)
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
};
 
export default httpTokenRequest;

export const upload = (path,filePath) => {
	let promise = new Promise(function(resolve, reject) {
		
	    uni.uploadFile({
	    	url: baseUrl + path, 
	    	filePath: filePath,
	    	name: 'file',
	    }).then(
	        (res) => {
	            resolve(JSON.parse(res[1].data))
	        }
	    ).catch(
	        (response) => {
	            reject(response)
	        }
	    )
	})
	return promise
}
