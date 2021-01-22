function fetchUser(id, cb) {
    setTimeout(() => {
        console.log("wait 0.1 sec.")
        const user = {
            id: id,
            name: "User" + id,
            email: id + "@test.com",
        }
        cb(user)
    }, 100)
}

// test("fetch a user", () => {
//     fetchUser(1, (user) => {
//     //fetchUser(2, (user) => {
//         expect(user).toEqual({
//             id: 1,
//             name: "User1",
//             email: "1@test.com",
//         })
//     })
// })
//위 테스트가 실행된느데는 약 1초 정도가 걸림 즉 setTimeOut에서의 시간이 영향이 있던건가?
//게다가 콘솔에 wait 0.1sec도 없어서 test통과가 통과같지가 않다는 것이다.

//테스트가 제대로 실패하는지 확일을 위해 id에 1대신 2를 넣어보면 실패야하는데 성공을한다.

test('fetch user',(done => {
    fetchUser(1,(user)=>{
        expect(user).toEqual({
            id:1,
            name:"User1",
            email:"1@test.com"
        })
        done()
    })
}))
function fetchUser2(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("wait 0.1 sec.")
            const user = {
                id: id,
                name: "User" + id,
                email: id + "@test.com",
            }
            resolve(user)
        }, 100)
    })
}
// test("fetch a user", () => {
//     fetchUser2(2).then((user) => {
//         expect(user).toEqual({
//             id: 1,
//             name: "User1",
//             email: "1@test.com",
//         })
//     })
// })
//이것도 위처럼 비동기임을 몰라서...
//그래서 이건 return 만 추가하면됨
test("fetch a user", () => {
    return fetchUser2(1).then((user) => {
        expect(user).toEqual({
            id: 1,
            name: "User1",
            email: "1@test.com",
        })
    })
})
test("fetch a user", async () => {
    const user = await fetchUser(2)
    expect(user).toEqual({
        id: 1,
        name: "User1",
        email: "1@test.com",
    })
})
//async와 await은 위 모양처럼 하고 값만 잘 한다면 잘 돌아감...!!
