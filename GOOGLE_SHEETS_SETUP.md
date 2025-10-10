# 구글 시트 연동 설정 가이드

## 📋 1단계: 구글 시트 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성
3. 시트 이름: "TMC 문의 접수"
4. 첫 번째 행에 헤더 추가:
   ```
   A1: 접수일시
   B1: 회사명
   C1: 담당자명
   D1: 이메일
   E1: 연락처
   F1: 관심서비스
   G1: 문의내용
   ```

## 🔧 2단계: Google Apps Script 설정

1. 구글 시트에서 **확장 프로그램** → **Apps Script** 클릭
2. 기본 코드를 삭제하고 `google-apps-script.js` 파일의 내용 복사/붙여넣기
3. **배포** → **새 배포** 클릭
4. **유형 선택** → **웹 앱** 선택
5. 다음 설정 적용:
   - **설명**: TMC 문의 폼 API
   - **다음 사용자로 실행**: 나
   - **액세스 권한**: 모든 사용자
6. **배포** 클릭
7. **웹 앱 URL** 복사 (예: https://script.google.com/macros/s/xxxxx/exec)

## 🔗 3단계: 랜딩페이지에 URL 연결

`script.js` 파일을 열고 다음 부분을 수정:

```javascript
// Line 40-50 부근
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

복사한 웹 앱 URL을 위 상수에 붙여넣기

## ✅ 4단계: 테스트

1. 랜딩페이지에서 문의 폼 작성
2. "문의하기" 버튼 클릭
3. 구글 시트에서 데이터 확인

## 🔐 보안 팁

- Apps Script 배포 시 "액세스 권한"을 "모든 사용자"로 설정해야 외부에서 접근 가능
- 민감한 데이터는 시트 공유 설정으로 보호
- 필요시 OAuth 인증 추가 가능

## 📧 이메일 알림 추가 (선택사항)

Apps Script에 다음 코드 추가:

```javascript
function doPost(e) {
  // ... 기존 코드 ...

  // 이메일 알림 전송
  MailApp.sendEmail({
    to: 'bckwon@tmcad.co.kr',
    subject: '새로운 문의가 접수되었습니다 - ' + data.company,
    body: `
회사명: ${data.company}
담당자: ${data.name}
이메일: ${data.email}
연락처: ${data.phone}
관심서비스: ${data.service}

문의내용:
${data.message}
    `
  });

  // ... 나머지 코드 ...
}
```

## 🚨 문제 해결

**에러: "권한이 없습니다"**
- Apps Script 배포 시 액세스 권한 확인
- 재배포 후 새 URL 사용

**데이터가 저장되지 않음**
- 브라우저 콘솔에서 에러 확인
- Apps Script 실행 로그 확인

**CORS 에러**
- Apps Script는 자동으로 CORS 처리
- URL이 정확한지 확인
