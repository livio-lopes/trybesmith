import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersMock from '../../mocks/orders.mock';
import statusCode from '../../../src/utils/statusCode';
import messageError from '../../../src/utils/messageErro';
import productIdsMiddleware from '../../../src/middlewares/productids.middleware';
chai.use(sinonChai);



describe('ProductIdsMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  })
  it('should be return 400 when productIds is empty', async function () {
    //arrange
    req.body = ordersMock.noProductsIds
    //act
    await productIdsMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.BAD_REQUEST)
    expect(res.json).to.have.been.calledWith(messageError.PRODUCTIDS_REQUIRED)

  })
  it('should be return 422 when productIds is array of empty', async function () {
    //arrange
    req.body = ordersMock.invalidProductIdsEmpty
    //act
    await productIdsMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(messageError.PRODUCTIDS_TYPE_ARRAY)
  })
  it('should be return 422 when productIds is type invalid', async function () { 
    //arrange
    req.body = ordersMock.invalidProductIdsType
    //act
    await productIdsMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(messageError.PRODUCTIDS_TYPE)
  })
  it('should be return 422 when productIds is type array differente of number', async function () {
    //arrange
    req.body = ordersMock.invalidProductIdsTypeArray
    //act
    await productIdsMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(messageError.PRODUCTIDS_TYPE_ARRAY)
  })
})