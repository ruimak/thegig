const {adder} = require('./utils')

test('should add', ()=>{
    const add = adder(1,2)
    expect(add).toBe(3)
});