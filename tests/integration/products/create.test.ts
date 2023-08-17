import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock'
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 201 when product is created', async function () {
    //arrange
    const httpRequest = productsMock.newProduct
    const mockResponse = ProductModel.build(productsMock.productCreated)
    sinon.stub(ProductModel, 'create').resolves(mockResponse)
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)  
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.CREATED)
    expect(httpResponse.body).to.be.deep.equal(productsMock.productCreated)
  })
  it('should return 400 when product name is empty', async function () {
    //arrange
    const httpRequest = productsMock.productNoName
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.BAD_REQUEST)
    expect(httpResponse.body).to.be.deep.equal(productsMock.messageError.NAME_REQUIRED)
  })
  it('should return 422 when product name is not a string', async function () {
    //arrange
    const httpRequest = productsMock.productNameTypeNumber
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(productsMock.messageError.NAME_TYPE)
  })
  it('should return 422 when product name length is less than 3', async function () {
    //arrange
    const httpRequest = productsMock.productShortName
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(productsMock.messageError.NAME_LENGTH)
  })
  it('should return 400 when product price is empty', async function () {
    //arrange
    const httpRequest = productsMock.productNoPrice
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.BAD_REQUEST)
    expect(httpResponse.body).to.be.deep.equal(productsMock.messageError.PRICE_REQUIRED)
  })
  it('should return 422 when product price is not a string', async function () {
    //arrange
    const httpRequest = productsMock.productPriceTypeNumber
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(productsMock.messageError.PRICE_TYPE)
  })
  it('should return 422 when product price length is less than 3', async function () {
    //arrange
    const httpRequest = productsMock.productShortPrice
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(productsMock.messageError.PRICE_LENGTH)
  });
});
