# Задача на рефакторинг

`LocalStorage` наследуется от `RemoteStorage` и включает в себя ряд нарушений SOLID. В нем как минимум 4 нарушения LSP.
Необходимо организовать корректное наследование. В результате можно изменить интерфейс методов "CRUD", но в обоих
классах они должны остаться асинхронными.
