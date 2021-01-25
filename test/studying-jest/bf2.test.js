const userService=require('./bfFunction')
const data=require('./bfData')

beforeAll(()=>{
    data.users.push(
        { id: 1, email: "user1@test.com" },
        { id: 2, email: "user2@test.com" },
        { id: 3, email: "user3@test.com" }
    )
})


test("check beforeAll",()=>{
    const users=userService.findAll()

    expect(users).toHaveLength(3)

})
afterAll(()=>{
    data.users.splice(0)
})
console.log(userService.findAll())