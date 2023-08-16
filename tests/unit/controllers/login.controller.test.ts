import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('should be return 401 when username is invalid', async function () {
    //arrange
    req.body = loginMock.noUserLogin
    sinon.stub(LoginService, 'login').resolves(loginMock.responseUnauthorized)
    //act
    await LoginController.login(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(loginMock.status.UNAUTHORIZED)
    expect(res.json).to.have.been.calledWith(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should be return 401 when password is invalid', async function () {
    //arrange
    req.body = loginMock.noPasswordLogin
    sinon.stub(LoginService, 'login').resolves(loginMock.responseUnauthorized)
    //act
    await LoginController.login(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(loginMock.status.UNAUTHORIZED)
    expect(res.json).to.have.been.calledWith(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should be return 200 when login is successful', async function () {
    //arrange
    req.body = loginMock.validLogin
    sinon.stub(LoginService, 'login').resolves(loginMock.responseOk)
    //act
    await LoginController.login(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(loginMock.status.OK)
    expect(res.json).to.have.been.calledWith(loginMock.responseOk.data)
  })

});
