import { IUserLogin, UserLoginModel } from "../../../src/model/UserLogin";
import { IAddress } from "../../../src/model/address";
import { ICreateUser } from "../../../src/model/createUser";
import { IUser, UserModel } from "../../../src/model/user";
import { UserService } from "../../../src/svc/user.service";

describe('user service', () => {

    const userService = new UserService();

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should login', async () => {
        const userToLogin: IUserLogin = {
            username: 'username', 
            password: 'ce32365c77250710602ae2262aa9f1ff3a4d0c567e65fe6d35f04f2eb14c4c9342a70023b5b1c322436219f8c43d9caa73901554906754f67050231ac012744a', 
            salt: 'randomSalt' 
        };

        UserLoginModel.findOne = jest.fn().mockImplementation((user) => {
            return user.username === 'username' ? Promise.resolve(userToLogin) : Promise.resolve(null)
        });

        const body = await userService.login('username', 'password');

        expect(body).toEqual(true);
    });

    it('should create user', async () => {
        const userCreate: ICreateUser = {
            username: 'username', 
            password: 'password',
            type: 'user'
        };

        const userToLogin: IUserLogin = {
            _id: 'createdUserId',
            username: 'username', 
            password: 'ce32365c77250710602ae2262aa9f1ff3a4d0c567e65fe6d35f04f2eb14c4c9342a70023b5b1c322436219f8c43d9caa73901554906754f67050231ac012744a', 
            salt: 'randomSalt' 
        };

        const user: IUser = {
            _id: 'userId',
            username: 'username', 
            type: 'user'
        };

        UserLoginModel.findOne = jest.fn().mockImplementation((user) => {
            return Promise.resolve(null)
        });

        UserLoginModel.create = jest.fn().mockImplementation((user) => {
            return Promise.resolve(userToLogin)
        });

        UserModel.create = jest.fn().mockImplementation((user) => {
            return Promise.resolve(user)
        });


        const body = await userService.createUser(userCreate);

        expect(body.success).toEqual(true);
    });

    it('should not create user when password is too short', async () => {
        const userCreate: ICreateUser = {
            username: 'username', 
            password: 'pass',
            type: 'user'
        };

        const userToLogin: IUserLogin = {
            _id: 'createdUserId',
            username: 'username', 
            password: 'ce32365c77250710602ae2262aa9f1ff3a4d0c567e65fe6d35f04f2eb14c4c9342a70023b5b1c322436219f8c43d9caa73901554906754f67050231ac012744a', 
            salt: 'randomSalt' 
        };

        const user: IUser = {
            _id: 'userId',
            username: 'username', 
            type: 'user'
        };

        UserLoginModel.findOne = jest.fn().mockImplementation((user) => {
            return Promise.resolve(null)
        });

        UserLoginModel.create = jest.fn().mockImplementation((user) => {
            return Promise.resolve(userToLogin)
        });

        UserModel.create = jest.fn().mockImplementation((user) => {
            return Promise.resolve(user)
        });


        const body = await userService.createUser(userCreate);

        expect(body.success).toEqual(false);
        expect(body.denialReason).toEqual('password too short');
    });

    it('should not create user with same username already exists', async () => {
        const userCreate: ICreateUser = {
            username: 'username', 
            password: 'password',
            type: 'user'
        };

        const userToLogin: IUserLogin = {
            _id: 'createdUserId',
            username: 'username', 
            password: 'ce32365c77250710602ae2262aa9f1ff3a4d0c567e65fe6d35f04f2eb14c4c9342a70023b5b1c322436219f8c43d9caa73901554906754f67050231ac012744a', 
            salt: 'randomSalt' 
        };

        UserLoginModel.findOne = jest.fn().mockImplementation((user) => {
            return Promise.resolve(userToLogin);
        });

        UserLoginModel.create = jest.fn().mockImplementation((user) => {
            return Promise.resolve(userToLogin);
        });

        UserModel.create = jest.fn().mockImplementation((user) => {
            return Promise.resolve(user);
        });


        const body = await userService.createUser(userCreate);

        expect(body.success).toEqual(false);
        expect(body.denialReason).toEqual('username taken');
    });

    it('should get user by username', async () => {
        const userReturn: IUser = {
            _id: 'userId',
            username: 'username', 
            type: 'user'
        };

        UserModel.findOne = jest.fn().mockImplementation((user) => {
            return user.username === 'username' ? Promise.resolve(userReturn) : Promise.resolve(null)
        });

        const body = await userService.getUserByUsername('username');

        expect(body).toEqual(userReturn);
    });

    it('should update address', async () => {
        const userReturn: IUser = {
            _id: 'userId',
            username: 'username', 
            type: 'user',
            addresses: [
                { addresslineOne: 'one', addresslineTwo: 'two', postcode: 'post' },
                { addresslineOne: 'two', addresslineTwo: 'three', postcode: 'postTwo' },
            ]
        };

        const addresses: Array<IAddress> = [
            { addresslineOne: 'one', addresslineTwo: 'two', postcode: 'post' },
            { addresslineOne: 'two', addresslineTwo: 'three', postcode: 'postTwo' },
        ];

        const mock = jest.fn().mockImplementation((userId, objectToUpdate) => {
            expect(objectToUpdate).toEqual({addresses: addresses});
            return userId === 'userId' ? Promise.resolve(userReturn) : Promise.resolve(null)
        });

        UserModel.findByIdAndUpdate = mock;


        const body = await userService.updateAddresses('userId', addresses);

        expect(body).toEqual(userReturn);
        expect(mock).toHaveBeenCalledWith('userId', { addresses: addresses});
    });
});