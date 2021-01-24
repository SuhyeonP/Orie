const userService=require('./bfFunction')
const data=require('./bfData')

test("find all users", () => {
    data.users.push(
        { id: 1, email: "user1@test.com" },
        { id: 2, email: "user2@test.com" },
        { id: 3, email: "user3@test.com" }
    )

    const users = userService.findAll()

    expect(users).toHaveLength(3)
    expect(users).toContainEqual({ id: 1, email: "user1@test.com" })
    expect(users).toContainEqual({ id: 2, email: "user2@test.com" })
    expect(users).toContainEqual({ id: 3, email: "user3@test.com" })
})
