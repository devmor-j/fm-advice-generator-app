import {describe, it, expect,beforeEach, afterEach} from 'vitest';
import {shallowMount, enableAutoUnmount} from "@vue/test-utils";

import QuoteCard from '../QuoteCard.vue';

describe('QuoteCard', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallowMount(QuoteCard);
  });
  
  enableAutoUnmount(afterEach);

  it('has get-advice button', () => {
    expect(wrapper.get('button.get-advice').exists()).toBe(true);
  });

  it('has quote element', () => {
    expect(wrapper.get('q').exists()).toBe(true);
  });

  it('has default quote advice', () => {  
    expect(wrapper.get('q').text()).toBeTruthy();
  });

  it('does not show error messages on startup', () => {
    expect(wrapper.find('.error').exists()).toBe(false);
  });

  // TODO: test a full api call on get-advice click
  // it("click works on the get-advice button", async () => {
  //   await wrapper.get("button.get-advice").trigger("click");
  // });
});
})
