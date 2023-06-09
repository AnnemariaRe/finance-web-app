# Wallet Keeper Web App
_________

Веб-сайт - приложение для финансового учета со следующим функционалом:
- добавление и снятие денег
- добавление счетов в кошелек
- статус всех счетов и накоплений
- статистика расходов и доходов по дням и категориям
- история всех транзакций
- актуальный курс валют

---------------------------------------
### Пример 
<img src="/public/img/1.jpg"/>
<img src="/public/img/2.jpg"/>
<img src="/public/img/3.jpg"/>

-----------------------------------------

### Схема базы данных
<img src="/public/img/db.png"/>


**User**: пользователь, который пользуется приложением по учету финансов, ведет наблюдения за состоянием свои счетов.  

**Account**: банковский или наличный счет пользователя, который имеет определенный тип, текущий баланс в определенной валюте, может быть активным и неактивным, имеет историю транзакций.  

**Transaction**: операция снятия или добавления определенной суммы денег в добавленном счете и указанной валюте, имеет дату.  

**Category**: пользователь может добавлять собственные категории для операций добавления и снятия, у каждой категории есть список транзакций в этой категории.

**Currency**: валюта с названием, трехбуквенным кодом и символом. Каждый счет имеет свою валюту.
