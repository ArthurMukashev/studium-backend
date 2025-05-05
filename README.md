# Проект "Студиум" _(надо придумать другое название)_

# Зависимости

- NestJS
- PrismaORM
- Redis

# Деплой

## .env

- Обязательно:
    - DATABASE_URL
- Опционально:
    - PORT

## Docker

- ```shell
    docker-compose up -d // поднимает БД и редис
    ```
- ```shell
    npx prisma migrate deploy // Запускает миграции и генерирует тестовые данные
    ```

