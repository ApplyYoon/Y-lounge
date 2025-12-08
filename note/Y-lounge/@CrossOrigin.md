#Annotation 

웹 브라우저의 보안 정책인 CORS(Cross-Origin Resource Sharing) 문제를 해결하기 위해 사용하는 스프링 부트 어노테이션

---

웹 브라우저는 기본적으로 보안상의 이유로 다른 도메인(또는 다른 포트)에 있는 서버로 요청을 보내는 것을 차단함. 이를 동일 **출처 정책(Same-Origin Policy)**이라고 함.

- 현재 상황:
	- Frontend: ```http://localhost:5173```
	- Backend: ```http://localhost:8080```

포트번호가 서로 다르기 때문에 브라우저는 이 둘을 **서로 다른 출처(Origin)**
로 인식하고, 프론트엔드가 백엔드로 데이터를 요청하면 차단함 

형태
```
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
```