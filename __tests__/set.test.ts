import set from './../src/index';

let data = {} as any;

beforeEach(() => data = {});

it('test with return value', () => {
  expect(Object.keys(data).length).toEqual(0);
  data = set(data, 'a.b.c.d.e', true);
  expect(data.a.b.c.d.e).toEqual(true);
  data = set(data, 'a.b.c.d.e.f', false);
  expect(data.a.b.c.d.e.f).toEqual(false);
  data = set(data, 'a.b.c', ['Hello']);
  expect(data.a.b.c).toEqual(['Hello']);
  data = set(data, 'a.b.c.1', 'World');
  expect(data.a.b.c).toEqual(['Hello', 'World']);
});

it('test with object reference', () => {
  expect(Object.keys(data).length).toEqual(0);
  const sameReference = set(data, 'a.b.c.d.e', true);
  expect(data.a.b.c.d.e).toEqual(true);
  set(data, 'a.b.c.d.e.f', false);
  expect(data.a.b.c.d.e.f).toEqual(false);
  set(data, 'a.b.c', ['Hello']);
  expect(data.a.b.c).toEqual(['Hello']);
  set(data, 'a.b.c.1', 'World');
  expect(data.a.b.c).toEqual(['Hello', 'World']);
  expect(sameReference === data).toEqual(true);
});

it('test for prototype pollution', () => {
  set(data, '__proto__.polluted', 'Yes! Its Polluted');
  expect(data.polluted).toEqual(undefined);
  expect(data.polluted).not.toEqual('Yes! Its Polluted');
  expect(({} as any).polluted).toEqual(undefined);
})
