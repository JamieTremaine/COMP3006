import supertest from "supertest";
import { userRoutes } from "../../../src/controllers/user.controller";
import { IUserLogin } from "../../../src/model/UserLogin";
import { UserService } from "../../../src/svc/user.service";
import { app } from "../../../src/server";
import { IUser } from "../../../src/model/user";
import { ICreateUser } from "../../../src/model/createUser";
import { IAddress } from "../../../src/model/address";

describe('user controller', () => {
    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });


    describe('routes', () =>{
        const routes = [
            { path: '/user/login', method: 'post' },
            { path: '/user', method: 'post' },
            { path: '/user/:username', method: 'get' },
            { path: '/user/:userId/addresses', method: 'post' }
          ];
    
          it.each(routes)('`$method` exists on $path', (route) => {
            expect(userRoutes.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).toBe(true)
            expect(userRoutes.stack.some((s) => s.route.path === route.path)).toBe(true)
          });
    });


    describe('/user/login', () => {
        it('should return 200', async () => {
            const userLogin: IUserLogin = { username: 'user', password: 'password' };

            const user: IUser = { _id: 'userid', username: 'username', type: 'user' };

            const userLoginSpy = jest.spyOn(UserService.prototype, 'login').mockImplementation((username, password) =>{ 
                return username === 'user' && password === 'password'? Promise.resolve(true): Promise.resolve(false)
            });

            const userSpy = jest.spyOn(UserService.prototype, 'getUserByUsername').mockImplementation((username) =>{ 
                return Promise.resolve(user)
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/user/login').send(userLogin).expect(200);

            expect(userLoginSpy).toHaveBeenCalledWith('user', 'password');
            expect(userSpy).toHaveBeenCalledWith('user');
            expect(body).toEqual(user);
        });

        it('should return 404', async () => {
            const userLogin: IUserLogin = { username: 'user', password: 'passwordWrong' };

            const user: IUser = { _id: 'userid', username: 'username', type: 'user' };

            const userLoginSpy = jest.spyOn(UserService.prototype, 'login').mockImplementation((username, password) =>{ 
                return username === 'user' && password === 'password'? Promise.resolve(true): Promise.resolve(false)
            });

            const userSpy = jest.spyOn(UserService.prototype, 'getUserByUsername').mockImplementation((username) =>{ 
                return Promise.resolve(user)
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/user/login').send(userLogin).expect(400);

            expect(userLoginSpy).toHaveBeenCalledWith('user', 'passwordWrong');
            expect(body).toEqual({});
        });
    });

    describe('/user', () => {
        it('should return 201', async () => {
            const userLogin: ICreateUser = { username: 'user', password: 'password', type: 'restaurant ' };

            const spy = jest.spyOn(UserService.prototype, 'createUser').mockImplementation((userLogin) =>{ 
                return Promise.resolve({ success: true })
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/user').send(userLogin).expect(201);

            expect(spy).toHaveBeenCalledWith(userLogin);
            expect(body).toEqual({ message: 'user created'});
        });

        it('should return 404', async () => {
            const userLogin: ICreateUser = { username: 'user', password: 'password', type: 'restaurant ' };

            const spy = jest.spyOn(UserService.prototype, 'createUser').mockImplementation((userLogin) =>{ 
                return Promise.resolve({ success: false, denialReason: 'denied' });
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/user').send(userLogin).expect(400);

            expect(spy).toHaveBeenCalledWith(userLogin);
            expect(body).toEqual({ success: false, denialReason: 'denied' });
        });
    });

    describe('/user/:username', () => {
        it('should return 200 and user', async () => {
            const user: IUser = { _id: 'userid', username: 'usernameTest', type: 'user' };

            const spy = jest.spyOn(UserService.prototype, 'getUserByUsername').mockImplementation((username) =>{ 
                return username === 'usernameTest' ? Promise.resolve(user): Promise.resolve(null);
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/user/usernameTest').expect(200);

            expect(spy).toHaveBeenCalledWith('usernameTest');
            expect(body).toEqual(user);
        });

        it('should return 404', async () => {
            const user: IUser = { _id: 'userid', username: 'usernameTest', type: 'user' };

            const spy = jest.spyOn(UserService.prototype, 'getUserByUsername').mockImplementation((username) =>{ 
                return username === 'usernameTest' ? Promise.resolve(user): Promise.resolve(null);
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/user/usernameTestWrong').expect(404);

            expect(spy).toHaveBeenCalledWith('usernameTestWrong');
            expect(body).toEqual({});
        });
    });

    describe('/user/:userId/addresses', () => {
        it('should return 200 and user', async () => {
            const addresses: Array<IAddress> = [
                { addresslineOne: 'one', addresslineTwo: 'two', postcode: 'post'},
                { addresslineOne: 'two', addresslineTwo: 'three', postcode: 'postTwo'},
            ] 
            const user: IUser = { _id: 'userid', username: 'usernameTest', type: 'user', addresses: addresses };

            const spy = jest.spyOn(UserService.prototype, 'updateAddresses').mockImplementation((userId, addresses) =>{ 
                return userId === 'testId' ? Promise.resolve(user): Promise.resolve(null);
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/user/testId/addresses').send(addresses).expect(200);

            expect(spy).toHaveBeenCalledWith('testId', addresses);
            expect(body).toEqual(user);
        });

        it('should return 500', async () => {
            const addresses: Array<IAddress> = [
                { addresslineOne: 'one', addresslineTwo: 'two', postcode: 'post'},
                { addresslineOne: 'two', addresslineTwo: 'three', postcode: 'postTwo'},
            ] 
            const user: IUser = { _id: 'userid', username: 'usernameTest', type: 'user', addresses: addresses };

            const spy = jest.spyOn(UserService.prototype, 'updateAddresses').mockImplementation((userId, addresses) =>{ 
                return userId === 'testId' ? Promise.resolve(user): Promise.resolve(null);
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/user/testIdWrong/addresses').send(addresses).expect(500);

            expect(spy).toHaveBeenCalledWith('testIdWrong', addresses);
        });
    });
});