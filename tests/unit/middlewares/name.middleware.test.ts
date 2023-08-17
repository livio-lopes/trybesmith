import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsMock from '../../mocks/products.mock';
import nameMiddleware from '../../../src/middlewares/name.middleware';

chai.use(sinonChai);

describe('NameMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  })

  it('should be return 400 when name is empty', async function () {
    //arrange
    req.body = productsMock.productNoName
    //act
    await nameMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.BAD_REQUEST)
    expect(res.json).to.have.been.calledWith(productsMock.messageError.NAME_REQUIRED)
  })
  it('should be return 422 when name is not a string', async function () {
    //arrange
    req.body = productsMock.productNameTypeNumber
    //act
    await nameMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(productsMock.messageError.NAME_TYPE)
  })
  it('should be return 422 when name length is less than 3', async function () {
    //arrange
    req.body = productsMock.productShortName
    //act
    await nameMiddleware(req, res, next)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(res.json).to.have.been.calledWith(productsMock.messageError.NAME_LENGTH)
  })
})