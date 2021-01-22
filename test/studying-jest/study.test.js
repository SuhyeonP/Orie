function getUser(id){
    return{
        id,
        email:`user${id}@test.com`
    }
}

test("check toEqual function",()=>{
    expect(getUser(1)).toEqual({
        id:1,
        email:`user1@test.com`
    })
})//toEqual은 객체검증시 사용

test("number 0 is falsy but string 0 is truthy And otherNumbers are reverse to zero",()=>{
    expect(0).toBeFalsy()
    expect(1).toBeTruthy()
    expect("0").toBeTruthy()
    expect("").toBeFalsy()
})
//string의 경우 빈문자는 false니까 toBeFalsy()는 false라는 것을 의미해서 test성공, ture는 tobeTruthy()면 성공

test("array",()=>{
    const colors=["red","yellow","orange"]
    expect(colors).toHaveLength(3)
    expect(colors).toContain("orange")
    expect(colors).not.toContain("black")
})
//배열에서 길이테스트는 toHaveLength(길이) , toContain(배열요소) 는 배열에 포함됫는지 약간 includes같은 느낌쓰
//not을 앞에 붙이면 안포함하는거 확인

test("string",()=>{
    expect(getUser(1).email).toBe('user1@test.com')
    expect(getUser(1).email).toMatch(/.*@test.com$/)
})
//toBe는 문자열 확인이고 toMatch는 정규식으로 부분 문자열 체크라고 생각

function getUser2(id){
    if(id<=0)throw new Error("Invalid ID")
    return{
        id,
        email:`user${id}@test.com`
    }
}

test("when id is negative throw the error",()=>{
    expect(()=>getUser2(-1)).toThrow()
    expect(()=>getUser2(-1)).toThrow("Invalid ID")
})
//예외발생여부를 체크하는것이기때문에 함수로 한번 묶어줘야함.
//안묶으면 예외가 무조건 발생하기때문.
