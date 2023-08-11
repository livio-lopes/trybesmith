import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductService from '../../../src/services/products.service';
import ProductController from '../../../src/controllers/products.controller';
import productsMock from '../../mocks/products.mock';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should be product is created', async function () {
    //arrage
    req.body = productsMock.newProduct
    sinon.stub(ProductService, 'create').resolves(productsMock.productCreated)
    //act
    await ProductController.create(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.CREATED)
    expect(res.json).to.have.been.calledWith(productsMock.productCreated)
  })


});
