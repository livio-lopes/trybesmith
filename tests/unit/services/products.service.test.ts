import { expect } from 'chai';
import sinon from 'sinon';
import productsMock from '../../mocks/products.mock';
const productsService = require('../../../src/services/products.service').default;
const ProductModel = require('../../../src/database/models/product.model').default;

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('should be product is created', async function () {
    // Arrange
    const parameters = productsMock.productCreated;
    const productCreated = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(productCreated);
    // Act
    const { newProduct } = productsMock
    const responseService = await productsService.create(newProduct);
    // Assert
    expect(responseService).to.be.deep.equal(parameters);
    expect(ProductModel.create).to.have.been.calledOnceWith(newProduct);
  } );

  it('should be product is listed', async function () {
    // Arrange
    const products = productsMock.listProducts.map(product => ProductModel.build(product).dataValues);
    sinon.stub(ProductModel, 'findAll').resolves(products);
    // Act
    const responseService = await productsService.listProducts();
    // Assert
    expect(responseService).to.be.deep.equal(productsMock.listProducts);
    expect(ProductModel.findAll).to.have.been.calledOnce;
  })  
});
