"use strict";
describe('Messages', () => {

  beforeEach(() => {
    browser.get('/#/messages');
  });

  it('should have a header', () => {
    expect($('h1').getText()).toEqual('An Angular Seed Project :D');
  });

  it('should populate messages', () => {
    /* Given */
    let btn = $('div[ng-view] button');

    /* When */
    btn.click();

    /* Then */
    expect($$('message-with-snake-case').count()).toEqual(4);
  });

});