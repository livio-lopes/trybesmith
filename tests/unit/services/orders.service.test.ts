import { expect } from 'chai';
import sinon from 'sinon';
import ordersMock from '../../mocks/orders.mock';
const OrdersService = require('../../../src/services/orders.service').default;
const OrderModel = require('../../../src/database/models/order.model').default;
const ProductModel = require('../../../src/database/models/product.model').default;
describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should be orders are listed', async function () {
    // Arrange
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.listOrders as any)
    //Act
    const serviceResponse = await OrdersService.listOrders()
    const mockResponse = ordersMock.responseService;    
    //Assert
    expect(serviceResponse).to.be.deep.equal(mockResponse)
  })
  it('should be orders are listed without productIds', async function () {
    //Arrange
     const listOrders = OrderModel.bulkBuild(ordersMock.responseNoProductIdsFindAll)
     sinon.stub(OrderModel, 'findAll').resolves(listOrders as any)
    //Act
    const serviceResponse = await OrdersService.listOrders()
    //Assert
    expect(serviceResponse).to.be.deep.equal(ordersMock.responseNoProductIds)
  })
  it('should be orders are created', async function () {
    // Arrange
    const orderResponse = OrderModel.build(ordersMock.responseServiceCreate);
    sinon.stub(OrderModel, 'create').resolves(orderResponse);
    sinon.stub(ProductModel, 'update').resolves();
    //Act
    const serviceResponse = await OrdersService.createOrder(ordersMock.createOrderValid);
    //Assert
    expect(serviceResponse).to.be.deep.equal(ordersMock.responseServiceCreate);
  })
});
