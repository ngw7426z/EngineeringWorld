Engineering World - 오리지널 공학 이미지 추가 패치

이 패치는 기존 웹사이트를 교체하지 않습니다.
33개 공학 분야, 최신 연구 요약, 리뷰, 퀴즈 등 기존 파일을 그대로 유지하면서
새로운 공학 일러스트 9종을 카드와 페이지 상단에 자동 연결합니다.

이미지 출처
- 이 패키지의 9개 일러스트는 Engineering World용으로 새로 생성한 오리지널 AI 이미지입니다.
- 클립아트코리아 또는 다른 외부 스톡 이미지 사이트에서 복사한 파일이 아닙니다.
- 각 이미지는 images/engineering/ 폴더에 WebP 형식으로 들어 있습니다.

적용 대상
- 메인 화면의 히어로 영역
- 공학 분야 카드 (현재 프로젝트가 .field-card 또는 .cards .card 구조를 사용하는 경우)
- 공학 분야별 상세 페이지의 헤더
- 공학이란? / 필요한 능력 / 퀴즈 / 진로 / 리뷰 페이지 상단
- 필요한 능력 및 소개 카드의 작은 이미지 배너

설치 방법
1. 최신 EngineeringWorld 프로젝트 폴더를 백업합니다.
2. 이 ZIP의 내용을 기존 프로젝트 폴더(index.html, fields.html이 있는 폴더)에 그대로 복사합니다.
   기존 HTML/CSS/JS 파일을 덮어쓰지 않습니다. 새 파일과 images 폴더만 추가됩니다.
3. INSTALL_IMAGES.bat을 더블클릭합니다.
   Windows에서 실행되지 않으면 Anaconda Prompt에서 해당 폴더로 이동한 뒤 다음 명령을 실행합니다.
       python install_images.py
4. index.html을 열고 이미지를 확인합니다.
5. 제대로 보이면 GitHub 저장소의 Add file > Upload files에서 추가된 파일과
   설치 스크립트가 수정한 HTML 파일들을 업로드하고 Commit changes를 누릅니다.
6. GitHub Pages 배포 후 Ctrl+F5로 새로고침합니다.

참고
- 설치 스크립트는 기존 HTML 파일을 .image_patch_backup 폴더에 백업합니다.
- 이 패키지는 기존 페이지 콘텐츠를 새 버전으로 교체하지 않습니다.
- 이미지가 보이지 않으면 images/engineering 폴더와 site-images.css, site-images.js가
  index.html과 같은 프로젝트 루트 기준 위치에 있는지 확인하세요.
