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
});
