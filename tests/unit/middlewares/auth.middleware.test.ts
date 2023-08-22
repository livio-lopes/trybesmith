import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import statusCode from '../../../src/utils/statusCode';
import messageError from '../../../src/utils/messageErro';
import authMiddleware from '../../../src/middlewares/auth.middleware';
chai.use(sinonChai);


describe.only('AuthMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  })
  it('should be return 401 when token is empty', async function () {
    //arrange
    const authorization = ''
    req.headers = { authorization }
    await authMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.UNAUTHORIZED)
    expect(res.json).to.have.been.calledWith(messageError.TOKEN_REQUIRED)
  })
  it('should be return 401 when token is invalid', async function () {
    //arrange
    const authorization = 'invalid token'
    req.headers = { authorization }
    //act
    await authMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.UNAUTHORIZED)
    expect(res.json).to.have.been.calledWith(messageError.TOKEN_INVALID)
  })
})