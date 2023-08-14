import { expect } from 'chai';
import sinon from 'sinon';
import ordersMock from '../../mocks/orders.mock';
const OrdersService = require('../../../src/services/orders.service').default;
const OrderModel = require('../../../src/database/models/order.model').default;

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
});
