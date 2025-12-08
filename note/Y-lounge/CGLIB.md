#Library  

CGLIB(Code Generator Library)는 **바이트코드 조작 라이브러리**로, 
스프링은 @Configuration이 붙은 클래스를 그대로 쓰지 않고,
CGLIB를 이용해 가짜(프록시) 클래스를 몰래 만듬

이유는 **싱글톤** 유지!


### 상황 예시
```
@Configuration
public class AppConfig {
    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository(); // (1)
    }

    @Bean
    public MemberService memberService() {
        // 여기서 memberRepository()를 또 호출해도, 
        // (1)에서 만든 걸 재활용합니다. (새로 생성 X)
        return new MemberService(memberRepository()); 
    }
}
```

- memberRepository() 메소드 호출
	- [[@Configuration]] 없음:
		 - new MemoryMemberRepository() 실행 -> **새 객체 생성**
		 - 또 호출시? -> 또 new 실행 (또 새 객체 생성)
	- 스프링 CGLIB ([[@Configuration]] 있음):
		- (프록시 클래스가 가로챔)
		- 이미 만들어둔 memberRepository 객체가 있는 걸 확인
		- 새로 안 만들고 이미 만들어진걸 줌 (항상 같은 객체 반환)