describe('Srodowisko testowe Jasmine', () => {
  it('Test wartości liczbowej', () => expect(12).toBeGreaterThan(10));
  it('Test wartości tekstowej', () => expect('Jens').toMatch('^Je'));
});
