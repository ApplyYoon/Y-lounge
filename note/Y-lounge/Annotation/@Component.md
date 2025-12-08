#Annotation 

스프링이 관리하는 가장 기초적인 부품
특정한 역할(웹, DB, 로직)이 정해지지 않은 범용 부품

- 직급 비유
	- **@Component**: 일반 사원 (어느 부서든 갈 수 있음, 가장 기본)
	- **@Controller**: 영업팀 사원 (웹 요청 담당)
	- **@Service**: 기획팀 사원 (비즈니스 로직 담당)
	- **@Repository**: 창고관리팀 사원 (DB 담당)


### 언제 @Component를 쓰나
Controller, Service, Repository 3단 계층(Layer)에 속하지 않는 애매한 친구들을 만들 때 씀
- 예시:
	- PasswordEncryptor
	- EmailSender
	- FileUploader