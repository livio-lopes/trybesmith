import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginMiddleware from '../../../src/middlewares/login.middleware';

chai.use(sinonChai);

describe('LoginMiddleware', function () {
    const req = {} as Request;
    const res = {} as Response;
    const next = sinon.stub();

    beforeEach(function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.restore();
    })
    it('should be return 400 when username is empty', async function () {
        //arrange
        req.body = loginMock.noUserLogin
        //act
        await loginMiddleware(req, res, next)
        //assert
        expect(res.status).to.have.been.calledWith(loginMock.status.BAD_REQUEST)
        expect(res.json).to.have.been.calledWith(loginMock.errorMessage.REQUIRED_FIELD) 
    })
    it('should be return 400 when password is empty', async function () {
        //arrange
        req.body = loginMock.noPasswordLogin
        //act
        await loginMiddleware(req, res, next)
        //assert
        expect(res.status).to.have.been.calledWith(loginMock.status.BAD_REQUEST)
        expect(res.json).to.have.been.calledWith(loginMock.errorMessage.REQUIRED_FIELD) 
    })
});