#Annotation

"이 클래스는 설정 파일(설계도)입니다" 라고 Spring에게 알려줌

과거에는 XML 파일에 설정을 적었지만, 요즘은 Java 코드로 설정을 대신함.
이때 사용하는 것이 바로 @Configuration

[[@Component]]를 붙이면 스프링이 알아서 찾아 등록해주지만(자동)
때로는, 개발자가 직접 수동으로 등록해야 할 때가 있음
(예: 외부 라이브러리 설정, 복잡한 조건부 생성 등)
이때 @Configuration에 붙은 클래스 안에서 [[@Bean]]을 사용함.

```
@Configuration // "이건 설정 파일이야"
public class AppConfig {

    @Bean // "이 메소드가 리턴하는 객체를 스프링 컨테이너에 등록해줘"
    public MyService myService() {
        return new MyService();
    }
}
```

- 그냥 클래스랑 다름 (싱글톤 보장)
@Configuration이 붙으면 스프링이 [[CGLIB]]라는 프록시를 부려서, 
객체가 딱 1개만 생성되도록(싱글톤)을 강력하게 보장함
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

만약 @Configuration 없이 그냥 [[@Bean]] 만 사용?
-> 호출할 떄마다 new가 실행되어 객체가 여러 개 생김