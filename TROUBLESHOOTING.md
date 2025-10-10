# 구글 시트 연동 문제 해결

## 🔍 "접수되었다"고 뜨는데 시트에 데이터가 없는 경우

### 체크리스트

#### 1. 시트 이름 확인
- Apps Script가 연결된 시트와 현재 보고 있는 시트가 **같은 시트**인지 확인
- 다른 탭(시트)을 보고 있지 않은지 확인

#### 2. Apps Script 실행 로그 확인
1. Apps Script 에디터 열기
2. 왼쪽 메뉴 → **실행** (⚡) 클릭
3. 최근 실행 내역에서 에러 확인
4. 에러가 있다면 메시지 복사

#### 3. 시트 권한 확인
- 시트가 읽기 전용이 아닌지 확인
- bckwon99@gmail.com 계정으로 로그인되어 있는지 확인

#### 4. Apps Script 테스트
Apps Script 에디터에서 직접 테스트:

```javascript
function testAddRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    '테스트 회사',
    '홍길동',
    'test@example.com',
    '010-1234-5678',
    '지하철 광고',
    '테스트 문의입니다'
  ]);
  Logger.log('테스트 데이터 추가 완료');
}
```

위 코드를 Apps Script에 추가하고 **실행** 버튼을 눌러보세요.

#### 5. 헤더 확인
첫 번째 행(A1~G1)에 헤더가 있는지 확인:
```
A1: 접수일시
B1: 회사명
C1: 담당자명
D1: 이메일
E1: 연락처
F1: 관심서비스
G1: 문의내용
```

---

## 🛠️ 해결 방법

### 방법 1: Apps Script 재배포

1. Apps Script 에디터 → **배포** → **배포 관리**
2. 현재 배포의 **연필 아이콘** 클릭
3. **버전** → **새 버전** 선택
4. **배포** 클릭
5. 새로운 URL은 동일하게 유지됨

### 방법 2: 디버깅 코드 추가

Apps Script 코드 수정:

```javascript
function doPost(e) {
  try {
    // 로그 추가
    Logger.log('POST 요청 받음');
    Logger.log('데이터: ' + e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    Logger.log('파싱 완료: ' + JSON.stringify(data));

    var timestamp = Utilities.formatDate(
      new Date(),
      "Asia/Seoul",
      "yyyy-MM-dd HH:mm:ss"
    );

    // 데이터 추가
    var row = [
      timestamp,
      data.company || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.message || ''
    ];

    Logger.log('추가할 행: ' + JSON.stringify(row));

    sheet.appendRow(row);

    Logger.log('시트에 추가 완료');

    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': '문의가 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('에러 발생: ' + error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 방법 3: 브라우저 개발자 도구 확인

1. 랜딩페이지에서 F12 (개발자 도구)
2. **Console** 탭 열기
3. 폼 제출
4. 에러 메시지 확인

### 방법 4: no-cors 문제

현재 `mode: 'no-cors'`로 설정되어 있어서 실제 에러가 있어도 "성공"으로 보일 수 있습니다.

임시로 cors 모드로 테스트:
