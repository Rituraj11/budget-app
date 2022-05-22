const chai = require("chai");
const dotenv = require('dotenv');
dotenv.config();
const chaiHttp = require("chai-http");
const expect = chai.expect
const baseUrl = process.env.APP_URL;

chai.use(chaiHttp);

describe("Budget Task API Unit Tests", function(){
    var authToken, budgetId, budgetBody;
    var name = Math.random().toString(36).substring(2,9);

    it('Server is Up and Running', (done) => {
    chai.request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      })
    })

    it('Register API Test', (done) => {
        let registerBody = {
            "name": name,
            "email": name+"@gmail.com",
            "phone": 1234567890,
            "password": "12345",
            "total_income": 5000000
        };

        chai.request(baseUrl)
          .post('/api/auth/register')
          .send(registerBody)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("id");
            expect(res.body.name).to.equal(registerBody.name);
            expect(res.body.email).to.equal(registerBody.email);
            expect(res.body.phone).to.equal(registerBody.phone);
            expect(res.body.total_income).to.equal(registerBody.total_income);
            done()
        })
    })
    it('Login API Test', (done) => {
      let loginBody = {
        "email": name+"@gmail.com",
        "password": "12345"
      };

      chai.request(baseUrl)
        .post('/api/auth/login')
        .send(loginBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("user_id");
          expect(res.body).to.have.property("token");
          authToken = res.body.token;
          done();
        })
    })

    it('Get User Details API Test', (done) => {
      chai.request(baseUrl)
        .get('/api/user/me')
        .set("auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        })
    })

    it('Create Budget API Test', (done) => {
      budgetBody = {
        "budget_name": "Test Budget",
        "budget_amount": 40000,
        "budget_month": "May",
        "categoryId": 3
      };

      chai.request(baseUrl)
        .post('/api/budget')
        .set("auth-token", authToken)
        .send(budgetBody)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body.message).to.equal("Budget Created");
          done();
        });
    })

    it('Get all Budgets API Test', (done) => {
      chai.request(baseUrl)
        .get('/api/budget?filter=May')
        .set("auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(200)
          budgetId = res.body[0].id;
          done();
        })
    })

    it('Get Budget Details using Id API Test', (done) => {
      chai.request(baseUrl)
        .get('/api/budget/'+budgetId)
        .set("auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("id");
          expect(res.body.budget_name).to.equal(budgetBody.budget_name);
          expect(res.body.budget_amount).to.equal(budgetBody.budget_amount);
          expect(res.body.budget_month).to.equal(budgetBody.budget_month);
          expect(res.body.categoryId).to.equal(budgetBody.categoryId);
          expect(res.body.user).to.have.property("id");
          expect(res.body.category).to.have.property("id");
          done();
        })
    })
    
    it('Update Budget API Test', (done) => {
      let budgetUpdateBody = {
        "budget_name": "Test budget",
        "budget_amount": 400000,
        "budget_month": "July",
        "categoryId": 2
      };

      chai.request(baseUrl)
        .put('/api/budget/'+budgetId)
        .set("auth-token", authToken)
        .send(budgetUpdateBody)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("Budget Updated");
          done();
        })
    })

    it('Get Categories API Test', (done) => {
      chai.request(baseUrl)
        .get('/api/category')
        .set("auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        })
    })

    it('Add Income API Test', (done) => {
      let incomeBody = {
        "expense_name": "freelance",
        "amount": 10000,
        "spend_date": "2022-05-18",
        "budgetId": budgetId
      };

      chai.request(baseUrl)
        .post('/api/expense/add-income')
        .set("auth-token", authToken)
        .send(incomeBody)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("id");
          expect(res.body.expense_name).to.equal(incomeBody.expense_name);
          expect(res.body.income).to.equal(incomeBody.amount);
          expect(res.body.spend_date).to.equal(incomeBody.spend_date);
          expect(res.body.budgetId).to.equal(incomeBody.budgetId);
          done();
        })
    })

    it('Add Expense API Test', (done) => {
      let expenseBody = {
        "expense_name": "freelance",
        "amount": 10000,
        "spend_date": "2022-05-18",
        "budgetId": budgetId
      };

      chai.request(baseUrl)
        .post('/api/expense/add-expense')
        .set("auth-token", authToken)
        .send(expenseBody)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("id");
          expect(res.body.expense_name).to.equal(expenseBody.expense_name);
          expect(res.body.expense).to.equal(expenseBody.amount);
          expect(res.body.spend_date).to.equal(expenseBody.spend_date);
          expect(res.body.budgetId).to.equal(expenseBody.budgetId);
          done();
        })
    })

    it('Delete Budget API test', (done) => {
      chai.request(baseUrl)
        .delete('/api/budget/'+budgetId)
        .set("auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        })
    })

  });