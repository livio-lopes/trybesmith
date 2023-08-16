import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should be return status 401 when username is invalid', async function () {
    //arrange
    sinon.stub(UserModel, 'findOne').resolves(null)
    //act
    const serviceResponse = await LoginService.login(loginMock.invalidUserNameLogin)
    //assert
    expect(serviceResponse.status).to.equal(loginMock.status.UNAUTHORIZED)
    expect(serviceResponse.message).to.equal(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should be return status 401 when password is invalid', async function () {
    //arrange
    const loginHagar = UserModel.build(loginMock.loginHagar)
    sinon.stub(UserModel, 'findOne').resolves(loginHagar)
    //act
    const serviceResponse = await LoginService.login(loginMock.invalidPasswordLogin)
    //assert
    expect(serviceResponse.status).to.equal(loginMock.status.UNAUTHORIZED)
    expect(serviceResponse.message).to.equal(loginMock.errorMessage.INVALID_LOGIN)
  })
  it('should be return status 200 when login is successful', async function () {
    //arrange
    const loginHagar = UserModel.build(loginMock.loginHagar)
    sinon.stub(UserModel, 'findOne').resolves(loginHagar)
    //act
    const serviceResponse = await LoginService.login(loginMock.validLogin)
    //assert
    expect(serviceResponse.status).to.equal(loginMock.status.OK)
    expect(serviceResponse.data).to.deep.equal(loginMock.responseOk.data)
  })
});
