#Annotation 

> [[Lombok]] 라이브러리의 일환


```
public void setUsername(String username) { this.username = username; }
// ... 필드별로 다 만들어야함
```

위 코드(값을 넣거나 수정하는)들을 하나하나 노가다 할 필요 없이 <span style="color:rgb(221, 157, 157)"><b>자동으로 생성</b></span>해줌

```user.setUsername("new Id")```처럼 값을 다룰 수 있음
