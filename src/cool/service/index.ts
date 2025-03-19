import { hmr } from '../hooks';
import { BaseService } from './base';

// service 数据集合
console.log('111', hmr, hmr.getData('service', {
	request: new BaseService().request
}));

export const service: Eps.Service = hmr.getData('service', {
	request: new BaseService().request
});

export * from './base';
