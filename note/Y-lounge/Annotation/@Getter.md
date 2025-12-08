#Annotation 

> [[Lombok]] 라이브러리의 일환


```
public Long getId() { return id; }
public String getUsername() { return username; }
public String getPassword() { return password; }
// ... 필드별로 다 만들어야함
```

위 코드들을 하나하나 노가다 할 필요 없이 <span style="color:rgb(221, 157, 157)"><b>자동으로 생성</b></span>해줌

```user.getUsername()```으로 값을 꺼낼 수 있음
