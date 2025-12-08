#Annotation 

HTTP POST 요청을 처리하기 위해 사용하는 스프링 부트 어노테이션

즉, "클라가 데이터를 보낼 때, 이 메서드로 받아서 처리해라"라고 지정하는 것

---
### 역할
 - 주로 데이터를 생성(Create)하거나 서버로 중요한 정보를 전송할 때 사용
 - ex) 회원가입, 로그인, 글 쓰기 ... 

---

### 사용 예
```
// 1. 회원가입: 사용자가 입력한 username, password를 받아야 함 -> POST
@PostMapping("/signup")
public ResponseEntity<?> signup(@RequestBody Map<String, String> body) { ... }

// 2. 로그인: 아이디와 비밀번호를 서버로 보내서 확인해야 함 -> POST
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> body) { ... }
```
