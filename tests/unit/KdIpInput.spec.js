import KdIpInput from '../../src/kd-ip-input.vue';
import { shallowMount } from '@vue/test-utils'

const factory = (propsData) => {
	return	shallowMount(KdIpInput, {
		propsData
	})
}
describe('KdIpInput.vue', () => {
	it('render dom', () => {
		const wrapper = factory({ ip: '' })
		expect(wrapper.classes('kd-ip-input-wrapper')).toBe(true)
		// expect(wrapper.find('input')).toBe(0)
	})
})
