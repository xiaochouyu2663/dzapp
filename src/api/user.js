import http from './index.js'

export async function login(data) {
  return http('/login', {
    method: 'post',
	data
  });
}