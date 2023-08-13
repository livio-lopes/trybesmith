import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 200 when products are listed', async function () {
    //arrange
    const mockResponse = productsMock.listProducts.map(product => ProductModel.build(product))
    sinon.stub(ProductModel, 'findAll').resolves(mockResponse)
    //act
    const httpResponse = await chai.request(app).get('/products')
    //assert
    expect(httpResponse.status).to.equal(productsMock.statusCode.OK)
    expect(httpResponse.body).to.be.deep.equal(productsMock.listProducts)
  })
});
