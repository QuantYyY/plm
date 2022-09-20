## Как запустить проект?
#### Frontend часть
1. Открыть папку frontend   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **"cd ../plm/plm/frontend"**
2. Запустить команды &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **"npm i"** и **"npm run serve"**
#### Backend часть
1. Открыть папку plm(где находиться **manage.py**) 
2. Должны быть установлены все зависимости из файла ../requirements.txt
3. Запустить команду **python manage.py runserver**(находясь в папке с **manage.py**)
4. Открыть указанный путь на локальный сервер
  
## Основной функционал для обычного пользователя
1. Просмотр таблиц со списками объектов
2. Отображение доступных объектов на карте
3. Редактирование, удаление, создание объектов
4. Импорт данных из файла **БД .sqlite**
5. Отслеживание и выбор версии данных
6. Смена пароля 

## Основной функционал администратора
1. Все указанное для обычного пользователя
2. Создание типов данных для карты
3. Создание групп пользователей
4. Доступ ко всем данным 
