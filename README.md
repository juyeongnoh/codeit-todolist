# TODO LIST

코드잇 스프린트 프론트엔드 단기심화 과정 지원자 과제

## 배포 링크

https://codeit-todolist-two.vercel.app/

## 실행하기

```bash
git clone https://github.com/juyeongnoh/codeit-todolist.git
npm install
npm run dev
```

http://localhost:3000

## 기능 설명

### 메인 페이지

<img width="1276" alt="Image" src="https://github.com/user-attachments/assets/fd7872de-e280-41e6-ae62-2d617183499d" />

- 상단 입력 창에 텍스트를 입력하고 `추가하기` 버튼을 클릭하거나 엔터를 치면 할 일이 생성됩니다.
- 생성된 할 일 항목의 왼쪽 버튼을 클릭하면 상태가 변경됩니다.
- 생성된 할 일 항목의 이름 영역을 클릭하면 상세보기 페이지로 이동합니다.

### 상세보기 페이지

<img width="1273" alt="Image" src="https://github.com/user-attachments/assets/6fff7979-d561-4168-8e5f-154970a0e151" />

- 할 일 항목 이름을 수정할 수 있습니다.
- 메모를 추가할 수 있습니다.
- 이미지(최대 1개)를 추가할 수 있습니다.
  - 이미지 파일 이름은 영어로만 이루어져야 하고, 5MB 이하여야 합니다.
- `수정 완료` 버튼을 클릭하면 변경 사항이 반영됩니다.
- `삭제하기` 버튼을 클릭하면 할 일이 삭제되고, 할 일 목록 페이지로 이동합니다.

## 기술 스택

- Next.js
- TypeScript
