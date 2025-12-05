데이터를 그대로 꽂아주는 역할
- **기본 동작**: 메소드가 반환하는 값을 화면(View)으로 해석하지 말고, HTTP 응답 본문에 그대로 적어라는 명령.
- **MessageConverter**: ViewResolver 대신 HTTPMassageConverter가 작동함. 자바 객체를 리턴하면 자동으로 JSON 같은 형식으로 변환해서 보냄
- **위치**: 메소드 위에 붙일 수도 있고, 클래스 전체에 적용하려면 [[@RestController]]를 쓰면 됨 