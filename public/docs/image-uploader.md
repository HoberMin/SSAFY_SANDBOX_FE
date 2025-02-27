# S3 Presigned URL을 이용한 이미지 업로드

## 학습 기대 효과

이 기능은 사용자가 Amazon S3 Presigned URL을 활용하여 이미지를 안전하게 업로드하고 관리하는 전체 플로우를 학습할 수 있도록 설계되었습니다. 이를 통해 클라우드 스토리지 활용 방법과 서버-클라이언트 간의 효율적인 파일 처리 방식을 이해할 수 있습니다.

- **Presigned URL 발급**: 임시 업로드 URL 생성 및 활용
- **이미지 업로드**: 클라이언트에서 S3로 직접 업로드
- **메타데이터 저장**: 업로드된 이미지 정보 DB 저장
- **이미지 관리**: 조회 및 삭제 기능

## 사용방법

- 이미지 파일을 선택합니다.
- 업로드 버튼을 클릭하면 자동으로 Presigned URL을 요청하고 이미지를 업로드합니다.
- 업로드된 이미지는 목록에서 확인할 수 있으며, 필요 시 삭제할 수 있습니다.
- 업로드 과정에서 문제가 발생하면 오류 메시지를 확인합니다.

## REST API 학습

- **Presigned URL 메커니즘**을 이해하고, 안전한 파일 업로드 방식을 학습합니다.
- **클라이언트-S3-서버** 간의 통신 흐름을 경험하며 효율적인 파일 처리 방식을 이해합니다.

## API 엔드포인트

### POST {{domain}}/upload/presigned-url

이 엔드포인트는 S3에 파일을 업로드하기 위한 **임시 서명 URL을 발급**하는 데 사용됩니다.

```json
// response 예시
{
  "presignedUrl": "https://your-bucket.s3.region.amazonaws.com/uuid?X-Amz-Algorithm=..."
}
```

발급된 URL은 **10분간 유효**하며, 이 시간 내에 클라이언트에서 직접 S3로 파일을 업로드해야 합니다.

### POST {{domain}}/upload/image

이 엔드포인트는 업로드가 완료된 이미지의 **URL 정보를 서버 DB에 저장**하는 데 사용됩니다.

```json
// request 예시
{
  "imageUrl": "https://your-bucket.s3.region.amazonaws.com/uuid"
}

// response 예시
{
  "id": 1,
  "imageUrl": "https://your-bucket.s3.region.amazonaws.com/uuid"
}
```

presigned URL에서 쿼리 파라미터를 제거한 기본 URL만 서버에 전달하여 저장합니다.

### GET {{domain}}/upload

이 엔드포인트는 **최근에 업로드된 이미지 정보를 조회**하는 데 사용됩니다.

```json
// response 예시
{
  "id": 1,
  "imageUrl": "https://your-bucket.s3.region.amazonaws.com/uuid"
}
```

저장된 이미지의 ID와 URL 정보를 확인할 수 있습니다.

## 이미지 업로드 플로우

**Presigned URL 발급**

- 프론트엔드에서 `/upload/presigned-url` 엔드포인트로 POST 요청을 보냅니다.
- 서버는 10분간 유효한 S3 Presigned URL을 생성하여 반환합니다.

**S3에 이미지 업로드**

- 프론트엔드는 받은 Presigned URL로 PUT 요청을 보내 이미지를 직접 S3에 업로드합니다.

```javascript
const response = await fetch(presignedUrl, {
  method: 'PUT',
  body: imageFile,
  headers: { 'Content-Type': imageFile.type },
});
```

**업로드 URL 저장**

- 업로드가 성공하면, Presigned URL에서 쿼리 파라미터를 제거한 URL을
- `/upload/image` 엔드포인트로 POST 요청하여 DB에 저장합니다.

## 주의사항

### Presigned URL 유효시간

- 발급된 URL은 **10분간만 유효**합니다.
- 업로드는 반드시 유효시간 내에 완료되어야 합니다.

### Content-Type

- 이미지 업로드 시 올바른 **Content-Type** 설정이 필요합니다.
- 예: image/jpeg, image/png 등
