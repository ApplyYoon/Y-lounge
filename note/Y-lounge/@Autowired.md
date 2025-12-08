#Annotation 

스프링이 알아서 필요한 객체를 가져와서 연결해 주는 기능으로,

이를 **의존성 주입(Dependency Injection)라고 함

---
### 사용하는 이유

1. UserRepository는 인터페이스라서 new로 직접 생성이 불가능 (껍데기만 있음)
2. 직접 new를 쓰려면, 수십 줄의 DB 연결 및 SQL 처리 코드를 일일이 다 짜서 구현 클래스를 만들어야함
   ex) findByUsername -> username을 select하기 위한 DB Connection, SQL ...
3. 스프링([[JPA]])은 인터페이스만 보고도 그 복잡한 코드를 자동으로 만들어줌.
	- findByUsername -> SELECT(find)... WHERE(By) username(username)  = ?
	- findByEmail -> SELECT(find)... WHERE(By) email(Email)  = ?
	- 이렇게 함수 이름만 보고 쪼개서 다 해줌
- ```@Autowired```는 스프링이 대신 만들어둔 위 완성품을 가져와서 코드에 꽂아주는 역할을 함

**인터페이스를 보고 함수에 맞게 스프링이 코드를 짜두면 @Autowired가 가져옴**