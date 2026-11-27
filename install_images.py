from pathlib import Path
import re, shutil, sys

root = Path(__file__).resolve().parent
html_files = [p for p in root.glob("*.html") if p.name.lower() not in {"image-preview.html"}]
if not html_files:
    print("오류: 이 폴더에서 HTML 페이지를 찾지 못했습니다.")
    print("이 설치 파일을 EngineeringWorld의 index.html, fields.html이 있는 폴더에 넣어 실행하세요.")
    sys.exit(1)

backup = root / ".image_patch_backup"
updated = []
for path in html_files:
    text = path.read_text(encoding="utf-8")
    original = text
    if 'href="site-images.css"' not in text:
        link = '<link rel="stylesheet" href="site-images.css">'
        if re.search(r"</head>", text, flags=re.I):
            text = re.sub(r"</head>", f"    {link}\n</head>", text, count=1, flags=re.I)
        else:
            print(f"건너뜀: {path.name} (head 태그 없음)")
            continue
    if 'src="site-images.js"' not in text:
        script = '<script src="site-images.js" defer></script>'
        if re.search(r"</body>", text, flags=re.I):
            text = re.sub(r"</body>", f"    {script}\n</body>", text, count=1, flags=re.I)
        else:
            print(f"건너뜀: {path.name} (body 태그 없음)")
            continue
    if text != original:
        backup.mkdir(exist_ok=True)
        backup_file = backup / path.name
        if not backup_file.exists():
            shutil.copy2(path, backup_file)
        path.write_text(text, encoding="utf-8")
        updated.append(path.name)

print("이미지 연결 작업 완료")
print(f"HTML 페이지 확인: {len(html_files)}개")
print(f"새로 연결한 페이지: {len(updated)}개")
for name in updated:
    print(" -", name)
print("백업 폴더:", backup.name)
print("이제 브라우저에서 index.html을 열어 이미지를 확인하세요.")
