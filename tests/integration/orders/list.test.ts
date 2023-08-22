import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ordersMock from '../../mocks/orders.mock';
import app from '../../../src/app';
const OrderModel = require('../../../src/database/models/order.model').default;

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 200 when orders are listed', async function () {
   //arrange
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.listOrders  as any)
   //act
    const response = await chai.request(app).get('/orders')
   //assert
   expect(response.status).to.be.equal(ordersMock.statusCode.OK)
   expect(response.body).to.be.deep.equal(ordersMock.responseService)
  })
});
