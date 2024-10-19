# CRUD

### 학습 기대 효과
이 기능은 사용자가 **Create, Read, Update, Delete** 작업을 경험하며, 데이터를 다루는 전반적인 흐름을 학습할 수 있도록 설계되었습니다. 이를 통해 데이터의 생명 주기를 이해하고, 각 작업에 필요한 절차와 통신 과정을 학습할 수 있습니다.
- **Create**: 새로운 데이터를 생성
- **Read**: 저장된 데이터를 조회
- **Update**: 기존 데이터를 수정
- **Delete**: 데이터를 삭제


### 사용방법
- `Edit Base URL`을 클릭해 본인이 설정한 URL을 등록합니다.
-  화면에 정상적인 기능이 동작하는지 확인합니다.
-  만약 에러가 발생한다면 Network 탭을 통해 디버깅을 진행합니다.


### 구현 예시 - Todo List
`Todo List`를 통해 CRUD 기능을 시각적으로 구현하여 데이터 구조에 대한 이해를 돕습니다.
사용자들이 리스트에 할 일을 추가하고, 조회하며, 수정하고, 삭제하는 기능을 경험할 수 있습니다.


### REST API 학습
- REST API의 기본 개념을 이해하고, 이를 기반으로 **HTTP 통신**을 학습합니다.
- **Request와 Response**에 대한 개념을 경험하며, API 명세서를 기반으로 올바르게 API 통신을 할 수 있도록 합니다.


### GET {{domain}}/todos
이 엔드포인트는 현재 저장된 **할 일 목록을 조회**하는 데 사용됩니다.
```json
{
  "todos": [
    {
      "id": 4,
      "content": "et porro tempora",
      "completed": true
    },
    {
      "id": 5,
      "content": "et qqporro tempora",
      "completed": true
    }
  ]
}
```
사용자는 이 요청을 통해 할 일 목록을 받아볼 수 있으며, 각각의 할 일은 **id**, **content**, **completed** 상태로 반환됩니다. 이 엔드포인트를 통해 모든 할 일의 상태를 한 번에 확인할 수 있습니다.


### POST {{domain}}/todos
이 엔드포인트는 새로운 할 일을 **생성**하는 데 사용됩니다.
```json
// request 예시
{
  "content": "오늘 할 일은 밥먹기"
}
```
사용자가 할 일의 **내용(content)** 을 입력하여 새로운 할 일을 생성합니다. 할 일 생성 시 기본적으로 **completed**는 **false** 상태로 설정됩니다. 서버는 생성된 할 일의 **id**와 **completed** 상태를 함께 반환합니다.


### PATCH {{domain}}/todos/{todoId}
이 엔드포인트는 특정 할 일의 **완료 여부(completed)** 를 업데이트하는 데 사용됩니다.
사용자는 할 일의 **todoId**를 지정하여 해당 할 일의 완료 상태를 **true** 또는 **false**로 업데이트할 수 있습니다. 이 요청을 통해 할 일의 상태를 미완료에서 완료로, 혹은 완료에서 미완료로 변경할 수 있습니다.


### DELETE {{domain}}/todos/{todoId}
이 엔드포인트는 특정 할 일을 **삭제**하는 데 사용됩니다.
**todoId**로 특정 할 일을 지정하여 삭제 요청을 보내며, 삭제 성공 시에는 확인 메시지가 반환됩니다. 삭제된 할 일은 더 이상 목록에서 조회되지 않으며, 할 일 리스트에서 사라집니다.