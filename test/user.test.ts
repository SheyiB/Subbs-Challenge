import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../src/index'; 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Create Task', ()=>{
    it('should create a new task', done => {
        chai.request(app)
            .post('/api/tasks/create')
            .send({
                title: "test",
                description: "test",
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.message).to.equal('Task created');
                expect(res.body.task.title).to.equal('test');
                done();
            });
    })

    it('should not create task with empty title', done => {
        chai.request(app)
            .post('/api/tasks/create')
            .send({
                title: "",
                description: "test",
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                //expect(res.body.message).to.equal('Title cannot be empty');
                done();
            });
            
    }   )
})

describe('Get Tasks', ()=>{
    it('should get all tasks', done => {

        chai.request(app)
            .get('/api/tasks/get')
            .send({
                userId: "1"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Tasks');
                expect(res.body.tasks).to.be.an('array');
                done();
            });
    })
})

describe('Get Task', ()=>{
    it('should get a task', done => {

        chai.request(app)
            .get('/api/tasks/get/1')
            .send({
                userId: "1"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Task');
                expect(res.body.task).to.be.an('object');
                done();
            });
    })
})

describe('Update Task', ()=>{
    it('should update a task', done => {

        chai.request(app)
            .put('/api/tasks/update')
            .send({
                title: "Updated Task",
                description: "test",
                isCompleted: true,
                taskId: "1"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Task Updated');
                expect(res.body.task.title).to.equal('Updated Task');
                expect(res.body.doneTime).to.be.a('date');
                done();

            });
    })
})

describe('Delete Task', ()=>{
    it('should delete a task', done => {

        chai.request(app)
            .delete('/api/tasks/delete')
            .send({
                taskId: "1"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Task Deleted');
                done();
            });
        
        chai.request(app)
            .get('/api/tasks/get/1')
            .send({
                userId: "1"
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.message).to.equal('Task not found');
                done();
            });
    })
})