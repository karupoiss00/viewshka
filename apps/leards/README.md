# Leards

Основное приложение – сервис для изучения английских слов

### Настройка утилит
1. Установить [JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
2. Создать переменную окружения `JAVA_HOME` и прописать туда путь до папки с JDK (пример: `C:\Program Files\Java\jdk-17`)
3. В переменную окружения PATH добавить `%JAVA_HOME%\bin`
4. Установить openapigenerator-cli: `yarn add @openapitools/openapi-generator-cli`
5. Установить [Go](https://go.dev/doc/install)
6. Выкачать репо [бэкенда](https://github.com/AkshachRd/leards-backend-go)

## Первый запуск
Перед первым запуском необходимо выполнить команду `nx run leards-build`, а также скопировать 
и переименовать файл `template.env.local` в `.env.local` в корне приложения

## Запуск

1. В корне репозитория бэкенда выполнить `go run main.go`
2. Выполнить `nx run leards:proxy-serve`

**Важно:** отлаживать приложениие по ссылке с приставкой `[ PROXY ]`

