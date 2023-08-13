import { expect } from 'chai';
import sinon from 'sinon';
import ordersMock from '../../mocks/orders.mock';
const OrdersService = require('../../../src/services/products.service').default;
const OrderModel = require('../../../src/database/models/product.model').default;


describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should be products are listed', async function () {
    // Arrange
    const orders = ordersMock.listed.map(order => OrderModel.build(order).dataValues);
    sinon.stub(OrderModel, 'findAll').resolves(orders);
    // Act
    const responseService = await OrdersService.listOrders();
    // Assert
    expect(responseService).to.be.deep.equal(ordersMock.listed);
    expect(OrderModel.findAll).to.have.been.calledOnce;
  })
});
