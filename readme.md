## 2023-1 심화캡스톤 팀 스팩업 프로젝트 "SLEP"

```
docker-compose up --build
```

회원가입, 로그인 등의 api는 따로 문서로 작성되지 않았습니다.
이를 제외한 모든 api는 http://127.0.0.1:5085/api/docs 에 들어가면 문서로 작성되어 있습니다.

인증방식은 Tokenbase authentication을 활용하려 합니다.

데이터베이스는 정해지면 모식도와 설명을 첨부 하겠습니다.

기술스택
  - python 3.9
  - django : 4.1.7
  - django-rest-framework : 3.14.0
  - django-ninja : 0.21.0
