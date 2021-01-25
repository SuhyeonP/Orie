const userService=require('./bfFunction')
const data=require('./bfData')

beforeEach(() => {
    data.users.push(
        { id: 1, email: "user1@test.com" },
        { id: 2, email: "user2@test.com" },
        { id: 3, email: "user3@test.com" }
    )
})

test("find all users", () => {

    const users = userService.findAll()

    expect(users).toHaveLength(3)
    expect(users).toContainEqual({ id: 1, email: "user1@test.com" })
    expect(users).toContainEqual({ id: 2, email: "user2@test.com" })
    expect(users).toContainEqual({ id: 3, email: "user3@test.com" })
})

test("check add user",()=>{
    const user={id:"4",email:"user4@test.com"}
    userService.create(user)

    expect(data.users).toHaveLength(4)
})

afterEach(()=>{
    data.users.splice(0)
})//매번 테스트이후 계속 실행된는거

test("destory a user",()=>{

    const id=3;
    const user=data.users.find(user=>user.id===id)
    userService.destroy(id)

    expect(data.users).toHaveLength(2)
    expect(data.users).not.toContainEqual(user)
})