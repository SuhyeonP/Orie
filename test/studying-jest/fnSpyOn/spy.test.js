const userService=require('./fnAdnSpyOn')
const axios = require("axios");

test("findOne returns a user",async()=>{
    const user=await userService.findOne(1)
    expect(user).toHaveProperty("id",1)
    expect(user).toHaveProperty("name","Leanne Graham")
})//mocking이 없는경우임

test("findOne fetches data from the API endPoint",async()=>{
    const spyGet=jest.spyOn(axios,"get");
    await userService.findOne(1)
    expect(spyGet).toBeCalledTimes(1)
    expect(spyGet).toBeCalledWith('https://jsonplaceholder.typicode.com/users/1')
})//이 테스트는 외부환경에 의존하고있어서 언제실행되든 항상 같은결과가 나온다 라는 원칙에 위배된다.
//이 문제를 해결하기 위해 axios 객체의 get함수가 항상 안정적으로 결과를 반환하도록 mocking해야한다.
//아래와 같이 axios.get를 어떤 고정된 결과값을 리턴해주는 가짜함수로 대체해주면 된다.
test("findOne returns what axios get returns",async()=>{
    axios.get=jest.fn().mockResolvedValue({
        data:{
            id:1,
            name:"su hyeon"
        }
    })

    const user=await userService.findOne(1)
    expect(user).toHaveProperty("id",1)
    expect(user).toHaveProperty("name","su hyeon")
})