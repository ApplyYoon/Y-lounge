화면(HTML)을 보여주는 역할
- **기본 동작**: 메소드가 문자열을 반환하면, 스프링은 그 문자열을 파일명으로 인식함.
- **ViewResolver**: 스프링 내부의 ViewResolver라는 녀석이 작동해서, 리턴된 이름과 일치하는 HTML(혹은 JSP 등) 파일을찾아서 사용자에게 보여줌.

```
@Controller
public class PageController {
    @GetMapping("/home")
    public String home() {
        return "index"; // "index.html" 파일을 찾아서 보여줘!
    }
}
```