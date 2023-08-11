import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from '../../mocks/products.mock'
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 201 when product is created', async function () {
    //arrange
    const httpRequest = mock.newProduct
    const mockResponse = ProductModel.build(mock.productCreated)
    sinon.stub(ProductModel, 'create').resolves(mockResponse)
    //act
    const httpResponse = await chai.request(app).post('/products').send(httpRequest)  
    //assert
    expect(httpResponse.status).to.equal(mock.statusCode.CREATED)
    expect(httpResponse.body).to.be.deep.equal(mock.productCreated)
  })
});
