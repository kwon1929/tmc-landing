# Formspree 설정 가이드 (20초 완료)

가장 확실하게 작동하는 이메일 폼 서비스입니다.

## 1단계: Form 생성 (20초)

1. https://formspree.io/ 접속
2. 이메일 입력: `kwonhyuk0131@gmail.com`
3. **"Get Started"** 또는 **"Sign Up"** 클릭
4. 이메일로 온 확인 링크 클릭하여 계정 활성화
5. 로그인 후 **"+ New Form"** 버튼 클릭
6. Form Name: `TMC Contact Form` (아무거나)
7. **Form ID** 복사 (예: `mabcdefg`)

## 2단계: 코드에 Form ID 붙여넣기

`index.html` 파일의 138번째 줄을 수정:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**예시:**
```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/mabcdefg" method="POST">
```

## 3단계: 완료!

바로 작동합니다.

---

## 첫 사용 시

처음 폼을 제출하면:
- Formspree가 자동으로 `kwonhyuk0131@gmail.com`로 확인 메일 전송
- **"Confirm your email"** 버튼 클릭
- 그 이후부터는 모든 문의가 자동으로 이메일로 전송됨

---

## 작동 방식

- 사용자가 문의 폼 제출
- Formspree가 `kwonhyuk0131@gmail.com`로 이메일 전송
- 모든 폼 내용이 깔끔하게 정리되어 전달됨

## 무료 플랜

- 월 50개 제출 무료
- 스팸 필터링 포함
- 별도 설정 불필요

## 확인 방법

1. Formspree 대시보드에서 실시간으로 제출 내역 확인 가능
2. Gmail로도 동시에 수신

---

**가장 안정적이고 확실한 방법입니다!**
