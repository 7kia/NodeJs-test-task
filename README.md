# NodeJs-test-task
## Описание
Автор: Колчин Илья. Тестовое задание для поступления в компанию "Лаборатория цифровых трансформации"
## Установка
1-ое тестовое задание лежит в папке chat-server, в ветке master, тесты в tests/chat-server. 

2-ое тестовое задание лежит в папке web-page, в ветке task2.

Запуск сервера в production режиме:
        
       cross-env NODE_ENV=production node -r esm chat-server/run-server.js

## Примечание
В проекте используется esm, для того чтобы поддерживать import вместо require, поэтому для 
запуска нужно прописывать -r esm.

## Тесты
Перед запуском нужно:

1) Создать PostgreSQL базу данных "ChatServerTest". Таблицы буду созданы автоматически при запуске сервера, если их нет.
Настройки соединения:

        {
            host: "localhost",
            port: 5432,
            database: isProductionMode ? "ChatServer" : "ChatServerTest",
            user: "postgres",
            password: "1",
        }

### Тесты. Примечание
Осторожно: в запущенном тестовом сервере должна быть пустая база данных
(изначально она будет пустой после создания, тестовые данные после использования удалаются)
, иначе тесты на поиск могут работать не корректно(может находиться больше данных, 
чем ожидается, или меньше если вы удалили что-нибудь сами)

2) Запустить тестовый сервер. Тестовый сервер подключается к тестовой базе данных,
это сделано для сохранности данных в основной базе данных:

         cross-env NODE_ENV=test node -r esm chat-server/run-server.js
    
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/repositories/chat-respository-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/repositories/message-respository-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/repositories/user-respository-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/chat-server-builder-director-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/chat-server-builder-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/domain-core-builder-director-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/domain-core-builder-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/error-message-generator-tests.js
         node -r esm "node_modules\mocha\bin\mocha" tests/chat-server/server-api-tests.js