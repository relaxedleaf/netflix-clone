import '@testing-library/jest-dom';
import { describe, expect } from '@jest/globals';
import { getUrl } from '@/utils/fetchUtils';

describe('getUrl', () => {
	it('populates url', () => {
		// Test #1
		expect(
			getUrl({
				baseUrl: 'https://fakeurl.com',
				params: {},
			})
		).toEqual('https://fakeurl.com');

		// Test #2
		expect(
			getUrl({
				baseUrl: '',
				params: {},
			})
		).toEqual('');

		// Test #3
		expect(
			getUrl({
				baseUrl: '',
				params: {
					key: 'value',
				},
			})
		).toEqual('');

		// Test #4
		expect(
			getUrl({
				baseUrl: 'https://fakeurl.com',
				params: {
					key: 'value',
				},
			})
		).toEqual('https://fakeurl.com?key=value');

		// Test #5
		expect(
			getUrl({
				baseUrl: 'https://fakeurl.com',
				params: {
					key: 'value',
					key2: 'value2',
				},
			})
		).toEqual('https://fakeurl.com?key=value&key2=value2');

		// Test #6
		expect(
			getUrl({
				baseUrl: 'https://fakeurl.com',
				params: {
					key: 'value',
					key2: 'value2',
				},
			})
		).toEqual('https://fakeurl.com?key=value&key2=value2');

		// Test #7
		expect(
			getUrl({
				baseUrl: 'https://fakeurl.com',
				params: {
					key: 'value',
					key2: 'value 2',
				},
			})
		).toEqual('https://fakeurl.com?key=value&key2=value%202');

		// Test #8
		expect(
			getUrl({
				baseUrl: 'https://fakeurl.com',
				params: {
					key: 'value',
					['key 2']: 'value 2',
				},
			})
		).toEqual('https://fakeurl.com?key=value&key%202=value%202');
	});
});
