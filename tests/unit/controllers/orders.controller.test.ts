import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import OrdersService from '../../../src/services/orders.service';
import OrdersController from '../../../src/controllers/orders.controller';
import ordersMock from '../../mocks/orders.mock';
import usersService from '../../../src/services/users.service';

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
  it('should be return 404 when user not found', async function () {
    //arrange
    req.body = ordersMock.invalidUserIdNotFound
    const userResponse = ordersMock.userNotFoundResponse
    sinon.stub(usersService, 'userById').resolves(userResponse)
   
    //act
    await OrdersController.createOrder(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(ordersMock.statusCode.NOT_FOUND)
    expect(res.json).to.have.been.calledWith(ordersMock.messageErro.USER_NOT_FOUND)
  })
  it('should be orders are created', async function () {
    //arrange
    req.body = ordersMock.createOrderValid
    const userResponse = ordersMock.userResponse as any;
    sinon.stub(usersService, 'userById').resolves(userResponse)
    const orderResponse = ordersMock.responseServiceCreate;
    sinon.stub(OrdersService, 'createOrder').resolves(orderResponse);
    const controllerResponse = {userId: 1, productIds: [1, 2] }
    //act
    await OrdersController.createOrder(req, res)
    //assert
    expect(res.status).to.have.been.calledWith(ordersMock.statusCode.CREATED)
    expect(res.json).to.have.been.calledWith(controllerResponse)
  })
});
