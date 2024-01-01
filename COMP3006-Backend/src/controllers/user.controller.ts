import { Router } from "express";
import { IUserLogin } from "../model/UserLogin";
import { UserService } from "../svc/user.service";
import { ICreateUser } from "../model/createUser";

export const userRoutes = Router();

const userService = UserService.getService();

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

/**
 * @openapi
 * /user/{username}:
 *  get:
 *      description: Use to get a user
 *      parameters:
 *      -   in: path
 *          name: username
 *      tags:
 *      -   user
 *      responses:
 *          '200':
 *              description: ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          '404':
 *              description: user not found
 *          '500':
 *              description: other server error
 */
userRoutes.get(`${path}/:username`, (req, res) => {
    userService.getUserByUsername(req.params.username).then((result) => {
        result == null ?
            res.status(404).send(`username: ${req.params.username} could not be found`):
            res.send(result);
    })
    .catch(()=> res.status(500).send());
});

