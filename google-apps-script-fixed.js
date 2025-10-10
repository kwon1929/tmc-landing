// TMC 문의 폼 - Google Apps Script
// 이 코드를 Apps Script 에디터에 복사/붙여넣기 하세요

function doPost(e) {
  try {
    // 현재 활성 시트 가져오기
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // POST 데이터 파싱
    var data = JSON.parse(e.postData.contents);

    // 현재 시간 (한국 시간)
    var timestamp = Utilities.formatDate(
      new Date(),
      "Asia/Seoul",
      "yyyy-MM-dd HH:mm:ss"
    );

    // 시트에 데이터 추가
    sheet.appendRow([
      timestamp,
      data.company || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.message || ''
    ]);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': '문의가 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput('TMC 문의 폼 API가 정상 작동 중입니다.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// 테스트 함수 (Apps Script 에디터에서 실행 가능)
function testFunction() {
  Logger.log('테스트 성공!');
  return 'OK';
}
