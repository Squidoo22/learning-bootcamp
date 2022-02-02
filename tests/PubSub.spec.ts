import pubSub from '../src/ts/PubSub';

describe('PubSub', () => {
  const mockedEventName = 'testEvent';
  const anotherMockedEventName = 'anotherTestEvent';
  const mockedFunc = jest.fn();
  const anotherMockedFunc = jest.fn();

  afterEach(() => {
    mockedFunc.mockClear();
    anotherMockedFunc.mockClear();
  });

  test('should create subscription on subscribe method called', () => {
    pubSub.subscribe(mockedEventName, mockedFunc);
    pubSub.subscribe(anotherMockedEventName, anotherMockedFunc);

    pubSub.publish(mockedEventName);
    pubSub.publish(anotherMockedEventName);

    expect(mockedFunc).toBeCalled();
    expect(anotherMockedFunc).toBeCalled();
  });

  test('should remove subscribtion on unsubscribe method called', () => {
    pubSub.unsubscribe(mockedEventName, mockedFunc);

    pubSub.publish(mockedEventName);
    pubSub.publish(anotherMockedEventName);

    expect(mockedFunc).not.toBeCalled();
    expect(anotherMockedFunc).toBeCalled();
  });
});