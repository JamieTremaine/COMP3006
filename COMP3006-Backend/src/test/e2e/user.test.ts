import supertest from "supertest";
import { app } from "../../server";
import { UserLoginModel } from "../../model/UserLogin";
import { UserModel } from "../../model/user";

describe('user e2e', () => {

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should login a user', async () => {
        const user = {
            "_id": "659845831000f466ee24caac",
            "username": "userOne",
            "type": "user",
            "addresses": [
              {
                "addresslineOne": "263 Manchester Road",
                "postcode": "TR91 8OL",
                "_id": "659845831000f466ee24caad"
              },
              {
                "addresslineOne": "26 London Road",
                "addresslineTwo": "HEMEL HEMPSTEAD",
                "postcode": "HP46 4ED",
                "_id": "659845831000f466ee24caae"
              }
            ],
            "__v": 0
        }

        const userLoginResult = {
            _id: '659845831000f466ee24caa5',
            username: 'userOne',
            password: '277a5c6fbeaa25b2dc74a82512a6d4e6403d312de1cb6a94018d002f41269b16bc5d1990f3ae24ba087c22a80b5431173c3ba8ee1cc55514c0ba6c23388b858c',
            salt: '12ac4173127f99f458843ca6310b2bd2',
            __v: 0
        };

        const userLoginRequest = {
            username: 'userOne',
            password: 'passwordOne'
        }

        UserLoginModel.findOne = jest.fn().mockImplementation((username) => {
            return username.username === 'userOne' ? Promise.resolve(userLoginResult) : Promise.resolve(null);
        });

        UserModel.findOne = jest.fn().mockImplementation((username) => {
            return username.username === 'userOne' ? Promise.resolve(user) : Promise.resolve(null);
        });
        
        const { body } = await supertest(app).post('/api/v1/user/login').send(userLoginRequest).expect(200);

        expect(body).toEqual(user);
    });

    it('should not login a user when password is incorrect', async () => {
        const user = {
            "_id": "659845831000f466ee24caac",
            "username": "userOne",
            "type": "user",
            "addresses": [
              {
                "addresslineOne": "263 Manchester Road",
                "postcode": "TR91 8OL",
                "_id": "659845831000f466ee24caad"
              },
              {
                "addresslineOne": "26 London Road",
                "addresslineTwo": "HEMEL HEMPSTEAD",
                "postcode": "HP46 4ED",
                "_id": "659845831000f466ee24caae"
              }
            ],
            "__v": 0
        }

        const userLoginResult = {
            _id: '659845831000f466ee24caa5',
            username: 'userOne',
            password: '277a5c6fbeaa25b2dc74a82512a6d4e6403d312de1cb6a94018d002f41269b16bc5d1990f3ae24ba087c22a80b5431173c3ba8ee1cc55514c0ba6c23388b858c',
            salt: '12ac4173127f99f458843ca6310b2bd2',
            __v: 0
        };

        const userLoginRequest = {
            username: 'userOne',
            password: 'passwordOneWrong'
        }

        UserLoginModel.findOne = jest.fn().mockImplementation((username) => {
            return username.username === 'userOne' ? Promise.resolve(userLoginResult) : Promise.resolve(null);
        });

        UserModel.findOne = jest.fn().mockImplementation((username) => {
            return username.username === 'userOne' ? Promise.resolve(user) : Promise.resolve(null);
        });
        
        const { body } = await supertest(app).post('/api/v1/user/login').send(userLoginRequest).expect(400);
    });

    it('should get a user', async () => {

        const user = {
            "_id": "659845831000f466ee24caac",
            "username": "userOne",
            "type": "user",
            "addresses": [
              {
                "addresslineOne": "263 Manchester Road",
                "postcode": "TR91 8OL",
                "_id": "659845831000f466ee24caad"
              },
              {
                "addresslineOne": "26 London Road",
                "addresslineTwo": "HEMEL HEMPSTEAD",
                "postcode": "HP46 4ED",
                "_id": "659845831000f466ee24caae"
              }
            ],
            "__v": 0
        }

        UserModel.findOne = jest.fn().mockImplementation((username) => {
            return username.username === 'userOne' ? Promise.resolve(user) : Promise.resolve(null);
        });

        const { body } = await supertest(app).get('/api/v1/user/userOne').expect(200);

        expect(body).toEqual(user);
    });

    it('should update user addresses', async () => {

        const userReturn = {
            "_id": "659845831000f466ee24caac",
            "username": "userOne",
            "type": "user",
            "addresses": [
              {
                "addresslineOne": "263 Manchester Road",
                "postcode": "TR91 8OL",
                "_id": "659845831000f466ee24caad"
              },
              {
                "addresslineOne": "26 London Road",
                "addresslineTwo": "HEMEL HEMPSTEAD",
                "postcode": "HP46 4ED",
                "_id": "659845831000f466ee24caae"
              }
            ],
            "__v": 0
        };

        const addresses = [ 
            {
                "addresslineOne": "263 Manchester Road",
                "postcode": "TR91 8OL",
                "_id": "659845831000f466ee24caad"
            },
            {
                "addresslineOne": "26 London Road",
                "addresslineTwo": "HEMEL HEMPSTEAD",
                "postcode": "HP46 4ED",
                "_id": "659845831000f466ee24caae"
            }
        ]


        const mock = jest.fn().mockImplementation(() => {
            return  Promise.resolve(userReturn);
        });

        UserModel.findByIdAndUpdate = mock;

        const { body } = await supertest(app).post('/api/v1/user/userOne/addresses').send(addresses).expect(200);

        expect(body).toEqual(userReturn);
        expect(mock).toHaveBeenCalledWith('userOne', {addresses: addresses});
    });
});