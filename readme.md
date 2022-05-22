Budget App
======

Tech Stack Used
------

Backend API :
**Nodejs**

Frontend Template:
**EJS**

Database:
**MySQL**

Hosted Database:
**AWS RDS**

DB ORM:
**Sequelize**

Test:
**Mocha-Chai**

Installation Process
------

Pull image from docker
`docker pull rituraj11/budget-app:latest`

Run Image
`docker run -it -p 8000:8000 rituraj11/budget-app`

Run URL
`http://localhost:8000/`

Run Test
`npm test`

Features
------

1. Sign Up
2. Login
3. Add Budget
4. Add Income/Expense under Budget
5. Share Budget Details

Data Table Structure
------

1. Users Table – To store the data of Users (Operations – Create, Read)
  * User Id
  * Name
  * Email
  * Phone
  * Password
  * Total Income
  * Date Created
  * Date Updated
  
2. Category Table – To store the Category Details (Operations – Read)
  * Category Id
  * Category Name
  * Date Created
3. Budget Table – To Store Budget Details (Operations – Create, Read, Update, Delete)
  * Budget Id
  * Budget Name
  * Amount
  * Category Id
  * Month
  * Date Created
  * Date Updated
4. Expense Table – To Store the Expense Details (Operations – Create, Read, Delete)
  * Expense Id
  * Expense Name
  * Income
  * Expense
  * Budget Id
  * Spend Date
  * Date Created
  * Date Updated


Work Flow
------

1. User Signups to the Application
2. User Logins to the Application
3. Creates a Budget and can view the budgets created on his dashboard and can also filter the budget by months
4. User can Add his income/expense on his declared budget and view the details like
5. Total Budget
6. Total Income over Budget
7. Total Expense
8. Budget Overdue if any
9. User can share the Budget Details with anyone