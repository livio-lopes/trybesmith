import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductService from '../../../src/services/products.service';
import ProductController from '../../../src/controllers/products.controller';
import productsMock from '../../mocks/products.mock';
import ProductModel, { ProductSequelizeModel } from '../../../src/database/models/product.model';

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
  it('should be product is listed', async function () {
    //arrange
    const parameters = productsMock.listProducts.map(product => ProductModel.build(product))
    sinon.stub(ProductService, 'listProducts').resolves(parameters)
    //act
    await ProductController.listProducts(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(productsMock.statusCode.OK)
    expect(res.json).to.have.been.calledWith(parameters)
  })


});
