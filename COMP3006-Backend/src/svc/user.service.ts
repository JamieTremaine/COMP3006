import crypto from "crypto";
import { IUserLogin, UserLoginModel } from "../model/UserLogin";
import { IUser, UserModel } from "../model/user";
import { ICreateUser } from "../model/createUser";
import { IAddress } from "../model/address";

export class UserService {

    private iterations = 1000;
    private keylen = 64;

    public async login(username: string, password: string): Promise<boolean> {
        let login: boolean = false;

        const userToLogin = await UserLoginModel.findOne({username: username});

        if(userToLogin?.salt) {
            const hash = crypto.pbkdf2Sync(password,
                userToLogin?.salt, this.iterations, this.keylen, `sha512`).toString(`hex`);

            if(crypto.timingSafeEqual(Buffer.from(hash, 'utf8'), Buffer.from(userToLogin.password, 'utf8'))) {
                login = true;
            }
        }

        return login;
    }

    public async createUser(userToCreate: ICreateUser): Promise<{success: boolean, denialReason?: string}> {

        if (userToCreate.password.length < 5) {
            return { success: false, denialReason: 'password too short' };
        }

        const existingUser = await UserLoginModel.findOne({userName: userToCreate.username});

        if(existingUser) {
            return { success: false, denialReason: 'username taken' };
        }

        const salt = crypto.randomBytes(16).toString('hex');

        const hash = crypto.pbkdf2Sync(userToCreate.password, salt,
            this.iterations, this.keylen, `sha512`).toString(`hex`);

        const userLogin: IUserLogin = { username: userToCreate.username , password: hash, salt: salt };
        
        let userToAdd: IUser;
        if(userToCreate.type === 'user') {
            userToAdd = {username: userToCreate.username, type: userToCreate.type, addresses: userToCreate.addresses };
        } else {
            userToAdd = {username: userToCreate.username, type: userToCreate.type, addresses: userToCreate.addresses, restaurantId: userToCreate.restaurantId };
        }

        const createdLogin = await UserLoginModel.create(userLogin);
        const createdUser = await UserModel.create(userToAdd);

        if(!createdUser._id && !createdLogin._id) {
            return { success: false, denialReason: 'error creating user' };
        }

        return  { success: true };
    }

    public async getUserByUsername(username: string): Promise<IUser | null> {
        return await UserModel.findOne({username: username})
    }

    public async updateAddresses(userId: string, addresses: Array<IAddress>): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(userId, {addresses: addresses})
    }
}