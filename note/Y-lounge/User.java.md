#Source 
**ORM 즉, JPA가 자바 코드와 데이터베이스를 매핑시키기 위해 필요한 정보들이 저장된 소스**

---

### Annotations
- [[@Entity]]
- [[@Table]]
- [[@Getter]], [[@Setter]], [[@NoArgsConstructor]] - Lombok
- [[@Id]]
- [[@GeneratedValue]]

---

### 생성자 (Constructor)

```
public User(String username, String password) {
	this.username = username;
	this.password = password;
}
```

- 우리가 회원가입 시킬 때  ```new User("아이디", "비번")``` 이렇게 편하게 객체를 만들려고 추가한 생성자.
