import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import usersServices from '../../../src/services/users.service';
import usersController from '../../../src/controllers/users.controller';
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
    req.body = loginMock.invalidUserNameLogin
    sinon.stub(usersServices, 'login').resolves(loginMock.responseUnauthorized)
    //act
    await usersController.login(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(loginMock.status.UNAUTHORIZED)
    expect(res.json).to.have.been.calledWith(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should be return 401 when password is invalid', async function () {
    //arrange
    req.body = loginMock.invalidPasswordLogin
    sinon.stub(usersServices, 'login').resolves(loginMock.responseUnauthorized)
    //act
    await usersController.login(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(loginMock.status.UNAUTHORIZED)
    expect(res.json).to.have.been.calledWith(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should be return 200 when login is successful', async function () {
    //arrange
    req.body = loginMock.validLogin
    sinon.stub(usersServices, 'login').resolves(loginMock.responseOk)
    //act
    await usersController.login(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(loginMock.status.OK)
    expect(res.json).to.have.been.calledWith(loginMock.responseOk.data)
  })

});
