#Source 


**Frontend의 요청은 "/api/auth/singup" 경로를 통해 이곳에 도달한다.**

---
### Annotations
- [[@RestController]]
- [[@RequestMapping]]
- [[@CrossOrigin]]
- [[@PostMapping]]
- [[@Autowired]]
 
---
### 컨트롤러 설정
<span style="color:rgb(221, 157, 157)"><b>@RestController</b></span>와
<span style="color:rgb(221, 157, 157)"><b>@RequestMapping("/api/auth")</b></span>가 붙어 있어 해당 경로의 요청을 처리한다.

---

### CORS 설정
<span style="color:rgb(221, 157, 157)">@CrossOrigin</span> 어노테이션이 있어 프론트엔드(포트 5173, 5174 등)에서 보내는 요청을 차단하지 않고 허용한다.

---

### UserRepository
[[@UserRepository.java]]

---

### 회원가입 로직 - <span style="color:rgb(221, 157, 157)">signup()</span> 
1. <span style="color:rgb(221, 157, 157)"><b>데이터 추출</b></span>: 요청 본문(body)에서 <span style="color:rgb(221, 157, 157)">username</span>과 <span style="color:rgb(221, 157, 157)">password</span>를 꺼냄
2. <span style="color:rgb(221, 157, 157)"><b>중복 검사</b></span>: 
	- ```userRepository.findByUsername(username)```을 호출하여 이미 존재하는 아이디인지 확인
	- 이미 존재하면 ```400 Bad Request``` 상태 코드와 함께 에러 메시지 반환
3. <span style="color:rgb(221, 157, 157)"><b>사용자 저장</b></span>:
	- 중복되지 않은 아이디라면 <span style="color:rgb(221, 157, 157)">User</span> 객체를 생성함.
	- ```userRepository.save(newUser)```를 호출하여 데이터베이스의 ```users``` 테이블에  새 사용자의 정보를 저장함
4. <span style="color:rgb(221, 157, 157)"><b>완료</b></span>: 저장이 성공하면 ```200 OK``` 상태 코드와 성공 메시지를 반환


로그인 로직도 비슷.