const proxy = {
	'/dev/': {
		target: 'http://127.0.0.1:8001',
		// target: 'http://frp.m9d2.cn:8001',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, '')
	},

	'/prod/': {
		target: 'https://show.cool-admin.com',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, '/api')
	}
};

const value = 'dev';
const host = proxy[`/${value}/`]?.target;

export { proxy, host, value };
