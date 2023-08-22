import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import statusCode from '../../../src/utils/statusCode';
import ordersMock from '../../mocks/orders.mock';
import messageError from '../../../src/utils/messageErro';
import userIdMiddleware from '../../../src/middlewares/userId.middleware';
chai.use(sinonChai);

describe.only('UserIdMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  })
  it('should be return 400 when userId is empty', async function () {
    //arrange
    req.body = ordersMock.noUserId
    //act
    await userIdMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.BAD_REQUEST)
    expect(res.json).to.have.been.calledWith(messageError.USERID_REQUIRED)
  })
  it('should be return 422 when userId is type invalid', async function () {
    //arrange
    req.body = ordersMock.invalidUserIdType
    //act
    await userIdMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(messageError.USERID_TYPE)
  })
})