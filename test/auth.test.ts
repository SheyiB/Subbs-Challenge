import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../src/index'; 

chai.use(chaiHttp);
const expect = chai.expect;

describe('SignUp', ()=>{
    it('should signup new user', done => {
        chai.request(app)
            .post('/api/auth/signup')
            .send({
                firstname: "test",
                lastname: "test",
                email: "test@test.com",
                password: "test"
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.message).to.equal('SignUp Successful');
                done();
            });
    })

    it('should not signup user with existing email', done => {
        chai.request(app)
            .post('/api/auth/signup')
            .send({
                firstname: "test",
                lastname: "test",
                email: "test@test.com",
                password: "test"
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message).to.equal('User already exists');
                done();
            });
            
    }   )
})

describe('Login', ()=>{
    it('should login user', done => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                email: "test@test.com",
                password: "test"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Login Successful');
                expect(res.body.token).to.be.a('string');
                done();
            })
        })

    it('should not login user with wrong email', done => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                email: "wrongemail@email.com",
                password: "test"
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.message).to.equal('User not found');
                done();
            })
        }
        )

    it('should not login user with wrong password', done => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                email: "test@test.com",
                password: "wrongpassword"
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message).to.equal('Invalid Credentials');
                done();
            })
        })
    });