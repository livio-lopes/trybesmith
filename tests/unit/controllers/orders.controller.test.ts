import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import OrdersService from '../../../src/services/orders.service';
import OrdersController from '../../../src/controllers/orders.controller';
import ordersMock from '../../mocks/orders.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('should be orders are listed', async function () {
    //arrange
    const orders = ordersMock.responseService;
    sinon.stub(OrdersService, 'listOrders').resolves(orders)
    //act
    await OrdersController.listOrders(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(ordersMock.statusCode.OK)
    expect(res.json).to.have.been.calledWith(orders)
  })
});
