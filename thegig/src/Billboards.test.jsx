import Billboards from './components/defaultPage/Billboards'
test('Fake Test',() => {
     
    expect(true).toBeTruthy()
})

it("renders correctly", () => {
    
    const wrapper = shallow(
        <Billboards/>
    )
    
    expect(wrapper).toMatchSnapshot()
})

it("renders correctly", () => {
    
    const wrapper = render(
        <Billboards />
        
    )
    
    expect(wrapper).toMatchSnapshot()
})

// t('renders three <Foo /> components', () => {
//     const wrapper = shallow(<Billboards />);
//     expect(wrapper.find('Button')).to.have.lengthOf(3);
//   });i
// describe('List tests', () => {

//     it('renders list-items', () => {
//       const items = ['one', 'two', 'three'];
//       const wrapper = shallow(<List items={items} />);
  
//       // Expect the wrapper object to be defined
//       expect(wrapper.find('.list-items')).toBeDefined();
//       expect(wrapper.find('.item')).toHaveLength(items.length);
//     });
  

it("renders correctly", () => {
    const wrapper = shallow(
        <Billboards/>
    )
    
    // const text = wrapper.find('Paper').to.have.lengthOf(0)
    // // expect(wrapper.find('arrowDown').text()).toEqual('Disabled')
    // expect(text).
})