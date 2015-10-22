import angular from 'angular';
import messages from './messages';

describe("Message Component", () => {

  it("should be named like", () => {
    expect(messages.name).toBe('app.func1');
  });

});
