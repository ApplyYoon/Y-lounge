#Annotation 

> [[Lombok]] 라이브러리의 일환


```
public User() {}
```

빈 껍데기 생성자(**<span style="color:rgb(221, 157, 157)">매개변수 없는 생성자</span>**)를 <span style="color:rgb(221, 157, 157)"><b>자동으로 생성</b></span>해줌

JPA가 데이터베이스에서 데이터를 가져와서 객체로 만들 때,
**일단 빈 객체(new User())를 먼저 만들고 갑을 채워 넣는 방식**을 사용.

**그래서 이러한 빈 생성자가 없으면 <span style="color:rgb(221, 157, 157)">에러(InstantiationException)</span>가 발생함.**


