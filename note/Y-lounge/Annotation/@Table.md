#Annotation 

>**이름표 붙이기.**
>형태 예시: @Table(name = "user")

- <span style="color:rgb(221, 157, 157)"><b>기본 동작</b></span>:
	- 만약 이 어노테이션이 없으면, JPA는 자바 클래스 이름(User)과 **똑같은 이름의 테이블을 무작정 찾아야함.**
- <span style="color:rgb(221, 157, 157)"><b>문제</b></span>: 
	- 그런데 user는 대부분 데이터베이스에서 예약어인 경우가 많아, 테이블을 만들 때 에러가 날 수 있음. 그래서 보통 **users**처럼 복수 이름이나 다른 이름을 씀
- <span style="color:rgb(221, 157, 157)"><b>해결</b></span>:
	- ```Table(name = "users")```라고 붙여주면, JPA에게 <span style="color:rgb(221, 157, 157)">"야 이 클래스의 이름은 User이지만, 실제 DB 테이블 이름은 users니깐 거기로 찾아가"</span>라고 **명확하게 주소를 알려주는 역할을 함.**
-