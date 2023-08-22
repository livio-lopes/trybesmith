import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ordersMock from '../../mocks/orders.mock';
import UserModel from '../../../src/database/models/user.model';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 401 with no token', async function () {
   //arrange
   const token = ''
   const httpBody = ordersMock.createOrderValid
   //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
   //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.UNAUTHORIZED)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.TOKEN_REQUIRED)
  })
  it('should return 401 with invalid token', async function () {
    //arrange
    const token = 'bode velho'
    const httpBody = ordersMock.createOrderValid
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.UNAUTHORIZED)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.TOKEN_INVALID)
  })
  it('should return 400 with userId field absent', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.noUserId
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.BAD_REQUEST)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.USER_REQUIRED)
  })
  it('should return 422 with userId with different type of number ', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.invalidUserIdType
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.USER_INVALID)
  })
  it('should return 404 with userId from user not found', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.invalidUserIdNotFound
    sinon.stub(UserModel, 'findByPk').resolves(undefined)
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.NOT_FOUND)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.USER_NOT_FOUND)
  })
  it('should return 400 with productIds field absent', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.noProductsIds
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.BAD_REQUEST)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.PRODUCT_REQUIRED)
  })
  it('should return 422 with productIds with different type of array', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.invalidProductIdsType
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert  
    expect(httpResponse.status).to.equal(ordersMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.PRODUCT_INVALID)
  })
  it('should return 422 with productIds with array of empty', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.invalidProductIdsEmpty
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert  
    expect(httpResponse.status).to.equal(ordersMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.PRODUCT_INVALID_TYPE)
  })
  it('should return 422 with productIds with different type of array of numbers', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.invalidProductIdsTypeArray
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.UNPROCESSABLE_ENTITY)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.messageErro.PRODUCT_INVALID_TYPE)
  })
  it('should return 201 when orders is created', async function () {
    //arrange
    const token = ordersMock.validToken
    const httpBody = ordersMock.createOrderValid
    const user = UserModel.build( ordersMock.user)
    const created = OrderModel.build(ordersMock.responseServiceCreate)
    sinon.stub(UserModel, 'findByPk').resolves(user)
    sinon.stub(OrderModel, 'create').resolves(created)
    sinon.stub(ProductModel,'update').resolves()
    //act
    const httpResponse = await chai.request(app).post('/orders').send(httpBody).set("Authorization", token)
    //assert
    expect(httpResponse.status).to.equal(ordersMock.statusCode.CREATED)
    expect(httpResponse.body).to.be.deep.equal(ordersMock.createOrderValid)
  })
});
 