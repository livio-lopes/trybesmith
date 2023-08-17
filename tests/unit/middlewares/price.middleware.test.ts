import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsMock from '../../mocks/products.mock';
import priceMiddleware from '../../../src/middlewares/price.middleware';

chai.use(sinonChai);

describe('PriceMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  })
  it('should be return 400 when price is empty', async function () {
    //arrange
    req.body = productsMock.productNoPrice
    //act
    await priceMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.BAD_REQUEST)
    expect(res.json).to.have.been.calledWith(productsMock.messageError.PRICE_REQUIRED)
  })
  it('should be return 422 when price is not a string', async function () {
    //arrange
    req.body = productsMock.productPriceTypeNumber
    //act
    await priceMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(productsMock.messageError.PRICE_TYPE)
  })
  it('should be return 422 when price length is less than 3', async function () {
    //arrange
    req.body = productsMock.productShortPrice
    //act
    await priceMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(productsMock.messageError.PRICE_LENGTH)
  })
})