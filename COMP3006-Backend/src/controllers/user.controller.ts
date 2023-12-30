import { Router } from "express";
import { IUserLogin } from "../model/UserLogin";
import { UserService } from "../svc/user.service";
import { IUser } from "../model/user";
import { ICreateUser } from "../model/createUser";

export const userRoutes = Router();

const userService = new UserService();

const path = '/user'


/**
 * @openapi
 * /user/login:
 *  post:
 *      description: login
 *      tags:
 *      -   user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userlogin'
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          '400':
 *              description: incorrect login
 *          '500':
 *              description: other server error
 */
userRoutes.post((`${path}/login`), (req, res) => {
    const userLogin: IUserLogin = req.body;

    userService.login(userLogin.username, userLogin.password).then((result) => {
        if (result) {
            userService.getUserByUsername(userLogin.username).then((user)=>{
                res.send(user);
            })

        } else {
            res.status(400).send('incorrect username or password')
        }
    });

});


/**
 * @openapi
 * /user:
 *  post:
 *      description: create user
 *      tags:
 *      -   user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createUser'
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          '400':
 *              description: could not create user
 *          '500':
 *              description: other server error
 */
userRoutes.post((`${path}`), (req, res) => {
    const user: ICreateUser = req.body;

    userService.createUser(user).then((result) => {
        if (result.success) {
            res.send('user created');
        } else {
            res.status(404).send(result.denialReason);
        }
    });
});

