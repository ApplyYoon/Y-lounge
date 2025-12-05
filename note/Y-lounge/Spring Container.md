Spring Framework의 핵심 엔진이자, 객체 관리자
쉽게 비유하자면, "똑똑한 공장장"

### **하는 일**

일반적인 자바 프로그래밍에서는 개발자가 직접 객체를 생성하고 관리함.
```
// 개발자가 직접 생성 (일반적인 방식)
HelloController controller = new HelloController();
```

하지만 Spring에서는 Spring Container가 해당 역할을 대신 해줌
[[@RestController]]
```
// 개발자는 "이거 필요해"라고 말만 하고, 실제 생성은 컨테이너가 담당
@RestController
public class HelloController { ... }
```

- 핵심 기능
	- IoC(Inversion of Control): 프로그램의 제어권이 개발자에서 컨테이너로 넘어갔다는 뜻
	- DI(Dependency Injection): 객체끼리 필요할 때 컨테이너가 알아서 연결해줌
- 쓰는 이유
	- 개발자가 복잡한 객체 생성/관리에 신경 쓰지 않고 비지니스 로직에만 집중할 수 있음
	- 객체 교체가 쉬워져서 유지보수가 편해짐
