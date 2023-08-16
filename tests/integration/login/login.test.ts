import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 400 when username is not provided', async function () {
    //arrange
    const httpBody = loginMock.noUserLogin
    //act
    const httpResponse = await chai.request(app).post('/login').send(httpBody)
    //assert
    expect(httpResponse.status).to.equal(loginMock.status.BAD_REQUEST)
    expect(httpResponse.body).to.be.deep.equal(loginMock.errorMessage.REQUIRED_FIELD)
  })
  it('should return 400 when password is not provided', async function () {
    //arrange
    const httpBody = loginMock.noPasswordLogin
    //act
    const httpResponse = await chai.request(app).post('/login').send(httpBody)
    //assert
    expect(httpResponse.status).to.equal(loginMock.status.BAD_REQUEST)
    expect(httpResponse.body).to.be.deep.equal(loginMock.errorMessage.REQUIRED_FIELD)
  })
  it('should return 401 when username is invalid', async function () {
    //arrange
    const httpBody = loginMock.invalidUserNameLogin
    sinon.stub(UserModel, 'findOne').resolves(null)
    //act
    const httpResponse = await chai.request(app).post('/login').send(httpBody)
    //assert
    expect(httpResponse.status).to.equal(loginMock.status.UNAUTHORIZED)
    expect(httpResponse.body).to.be.deep.equal(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should return 401 when password is invalid', async function () {
    //arrange
    const httpBody = loginMock.invalidPasswordLogin
    const mockResponse = UserModel.build(loginMock.loginHagar)
    sinon.stub(UserModel, 'findOne').resolves(mockResponse)
    //act
    const httpResponse = await chai.request(app).post('/login').send(httpBody)
    //assert
    expect(httpResponse.status).to.equal(loginMock.status.UNAUTHORIZED)
    expect(httpResponse.body).to.be.deep.equal(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should return 200 when login is successful', async function () {
    //arrange
    const httpBody = loginMock.validLogin
    const mockResponse = UserModel.build(loginMock.loginHagar)
    sinon.stub(UserModel, 'findOne').resolves(mockResponse)
    //act
    const httpResponse = await chai.request(app).post('/login').send(httpBody)
    //assert
    expect(httpResponse.status).to.equal(loginMock.status.OK)
    expect(httpResponse.body).to.have.property('token')
  })
});
