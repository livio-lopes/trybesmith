import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ordersMock from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 200 when orders are listed', async function () {
    //arrange
    const mockResponse = ordersMock.listed.map(order => OrderModel.build(order))
    sinon.stub(OrderModel, 'findAll').resolves(mockResponse)
    //act
    const httpResponse = await chai.request(app).get('/orders')
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.OK)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.listed)
  })
});
