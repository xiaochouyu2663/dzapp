const Mock = require('mockjs');

const userInfo = (req, res) => {
	const params = JSON.parse(req.body || '{}')
	if (params.username == 'admin' && params.password == '123456') {
		return {
			code: 200,
			data: {
				username: 'admin'
			}
		}
	} else {
		return {
			code: 400,
			msg: '账号或密码错误'
		}
	}
}

Mock.mock('http://cloud.ts.donzhu.com/login','post',userInfo)