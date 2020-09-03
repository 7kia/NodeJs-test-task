# NodeJs-test-task
## Описание
Автор: Колчин Илья. Тестовое задание для поступления в компанию "Лаборатория цифровых трансформации"
## Установка
1 тестовое задание лежит в папке chat-server, тесты в tests/chat-server. 

2 тестовое задание лежит в папке web-page.

Запуск сервера:
        
       node -r esm chat-server/run-server.js

## Примечание
В проекте используется esm, для того чтобы поддерживать import вместо require, поэтому для 
запуска тестов нужно прописывать -r esm:

     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/repositories/chat-respository-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/repositories/message-respository-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/repositories/user-respository-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/chat-server-builder-director-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/chat-server-builder-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/domain-core-builder-director-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/domain-core-builder-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/error-message-generator-tests.js
     node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/server-api-tests.js