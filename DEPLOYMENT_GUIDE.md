# 서버 배포 가이드

TMC 랜딩페이지를 배포하는 여러 방법을 소개합니다.

---

## 🚀 옵션 1: GitHub Pages (무료, 가장 간단)

### 장점
- 완전 무료
- 설정 매우 간단
- 자동 HTTPS 지원
- 커스텀 도메인 연결 가능

### 단계

1. **GitHub 저장소 생성**
   ```bash
   cd /Users/kwonhyuk/tmc_landing
   git init
   git add .
   git commit -m "Initial commit: TMC Landing Page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tmc-landing.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소 페이지 → Settings
   - 왼쪽 메뉴 → Pages
   - Source: main 브랜치 선택
   - Save 클릭

3. **접속**
   - 약 1-2분 후 `https://YOUR_USERNAME.github.io/tmc-landing` 에서 확인

4. **커스텀 도메인 연결 (선택사항)**
   - 도메인 구매 (예: tmcad.co.kr)
   - DNS 설정: CNAME 레코드 추가
   - GitHub Pages에서 Custom domain 입력

---

## 🌐 옵션 2: Vercel (무료, 추천)

### 장점
- 무료 호스팅
- 자동 배포 (Git push 시)
- 빠른 CDN
- 분석 도구 제공

### 단계

1. **Vercel 계정 생성**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인

2. **프로젝트 import**
   - "Add New" → "Project" 클릭
   - GitHub 저장소 선택
   - Deploy 클릭

3. **접속**
   - 자동 생성된 URL로 접속 (예: tmc-landing.vercel.app)
   - 커스텀 도메인 연결 가능

---

## ☁️ 옵션 3: Netlify (무료, 드래그앤드롭)

### 장점
- 무료 호스팅
- 드래그앤드롭 배포 가능
- Form 처리 기능 내장
- 자동 HTTPS

### 단계

1. **Netlify 계정 생성**
   - [netlify.com](https://netlify.com) 접속

2. **배포**
   - "Add new site" → "Deploy manually" 클릭
   - tmc_landing 폴더를 드래그앤드롭
   - 또는 GitHub 연동

3. **Form 처리 (추가 기능)**
   - HTML form에 `netlify` 속성 추가:
     ```html
     <form netlify>
     ```
   - 자동으로 제출 내용을 Netlify에서 확인 가능

---

## 🔧 옵션 4: 자체 서버 (VPS/웹호스팅)

### AWS, Google Cloud, 카페24 등

1. **서버 준비**
   - 웹호스팅 또는 VPS 구매
   - 도메인 연결

2. **파일 업로드**
   - FTP/SFTP로 파일 업로드
   - 또는 Git clone 후 배포

3. **웹서버 설정**
   - Nginx 또는 Apache 설정
   - SSL 인증서 설치 (Let's Encrypt 무료)

---

## 📱 추천 배포 순서

### 초보자용 (5분 소요)
1. GitHub Pages 또는 Netlify 드래그앤드롭

### 전문가용 (10분 소요)
1. GitHub 저장소 생성
2. Vercel 연동
3. 커스텀 도메인 연결

---

## 🔗 커스텀 도메인 연결하기

### DNS 설정 (도메인 업체에서)

**GitHub Pages:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

**Vercel:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Netlify:**
```
Type: CNAME
Name: @
Value: YOUR_SITE.netlify.app
```

---

## ✅ 배포 후 체크리스트

- [ ] 모든 페이지가 정상 작동하는지 확인
- [ ] 모바일에서 테스트
- [ ] 문의 폼 제출 테스트
- [ ] 구글 시트 연동 확인
- [ ] 이메일 알림 테스트
- [ ] SEO 메타태그 추가 (선택사항)
- [ ] Google Analytics 연동 (선택사항)

---

## 🚨 문제 해결

**페이지가 안 보여요**
- 파일 경로 확인 (대소문자 구분)
- index.html이 루트에 있는지 확인

**CSS/JS가 안 불러와져요**
- 상대 경로 사용 확인
- 브라우저 캐시 삭제

**폼 제출이 안 돼요**
- 구글 시트 URL 확인
- Apps Script 배포 상태 확인
- 브라우저 콘솔 에러 확인

---

## 📞 도움이 필요하면

- GitHub Issues
- Vercel/Netlify 고객 지원
- [TMC 이메일](mailto:bckwon@tmcad.co.kr)
