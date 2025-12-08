#Source 

**Spring Data [[JPA]]에서 제공하는 데이터베이스 접근 계층**

---
```
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
```
---

1. <span style="color:rgb(221, 157, 157)"><b>interface UserRepository</b></span>
	 - <span style="color:rgb(221, 157, 157)">인터페이스(Interface)</span>: 클래스가 아니라 인터페이스.
	   우리가 직접 구현 클래스를 만들지 않아도, Spring Boot가 실행될 때 자동으로 구현체를 만들어줌. 즉, 껍데기만 정의해두면 실제 작동하는 알맹이는 Spring이 채워줌.
	 
2. <span style="color:rgb(221, 157, 157)"><b>extends JpaRepository(User, Long)</b></span>  -> <User, Long>
	- <span style="color:rgb(221, 157, 157)">상속(Extends)</span>: ```JpaRepository``` 라는 스프링 인터페이스를 상속받음
	- <span style="color:rgb(221, 157, 157)">제네릭</span> <User, Long>:
		- **User**: 이 리포지토리가 관리할 Entitiy 클래스.
		  즉, 이 리포지토리는 DB의 user테이블과 연동됨
		- **Long**: 엔티티의 ID(Primary Key) 타입.
		  User 클래스([[User.java]])의 ``private Long id`` 라고 선언되어 있기에 Long 타입 사용
	- <span style="color:rgb(221, 157, 157)"><b>기능</b></span>: 이렇게 상속만 받아도 수많은 메서드를 사용 가능하다.
	    - ```save(User user)```: <span style="color:rgb(221, 157, 157)">저장 및 수정</span> (INSERT / UPDATE)
	    - ```findById(Long id)```: ID로 <span style="color:rgb(221, 157, 157)">조회</span> (SELECT ... WHERE id = ?)
		- ```findAll()```:  <span style="color:rgb(221, 157, 157)">전체 조회</span> (SELECT * FROM users)
		- ```delete(User user)```: <span style="color:rgb(221, 157, 157)">삭제</span> (DELET)

![[Pasted image 20251208145411.png]]