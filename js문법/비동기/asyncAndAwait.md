https://www.daleseo.com/js-async-async-await/


###비동기 처리 JS       
#####Promise <br/>
```javascript
function fetchAuthorName(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => post.userId)
    .then((userId) => {
      return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((user) => user.name)
    })
}

fetchAuthorName(1).then((name) => console.log("name:", name))
```
브라우저 내장 함수인 fetch()를 호출하여 Promise 객체를 리턴받은 후에, Method Chaning 기법을 통해 then() 메서드를 연쇄적으로 호출하고 있다.<br/>
마치 리눅스의 파이프(`|`) 키워드처럼 then() 메서드는 바로 이전 then() 메서드의 출력값을 입력값으로 사용하여 새로운 출력값을 만들고, 바로 다음 then() 메서드의 입력값으로 넘겨준다.<br/>

