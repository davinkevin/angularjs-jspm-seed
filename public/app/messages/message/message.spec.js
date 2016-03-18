import Message from './message';

describe('Message', () => {

  it('should be instantiable', () => {
    let message = new Message();
    expect(message).toBeDefined();
  });

  it('should be a component', () => {
      expect(Message.component).toBeDefined();
      expect(Message.$componentName).toBeDefined();
  });

});