#Annotation 

### 역할
- **JSON 반환**: 자바 객체(String, List, Class 등)을 리턴하면, 자동으로 JSON 형식으로 변환해서보냄.
- **API 서버용**: React, Vue, 모바일 앱 같은 프론트엔드와 통신할 떄 주로 사용함

### [[@Controller]]와 차이점
- **@Controller**: 주로 화면(HTML)을 찾아서 보여줄 때 사용함.
- **@RestController**: 데이터 그 자체를 줌 {"msg": "hello"}


### 동작 원리
@RestContoller는 두 Annotation을 합친 것.
([[@Controller]] + [[@ResponseBody]])


```
@RestController // 1. 나 컨트롤러야. 그리고 데이터만 줄 거야.
public class HelloController {

    @GetMapping("/")
    public String hello() {
        // 2. 이 문자열 자체가 그대로 브라우저에 전송됨 (HTML 파일 아님)
        return "Hello from Spring Boot! ...";
    }
}
```