import supertest from "supertest";
import { orderRoutes } from "../../../controllers/order.controller";
import { IOrder } from "../../../model/order";
import { app } from "../../../server";
import { OrderService } from "../../../svc/order.service";

describe('order controller', () => {
    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    describe('routes', () =>{
        const routes = [
            { path: '/order/:userId/recent', method: 'get' },
            { path: '/order/:orderId', method: 'get' },
            { path: '/order/:restaurantId/active', method: 'get' },
            { path: '/order', method: 'post' },
            { path: '/order/:orderId', method: 'delete' },
          ];
    
          it.each(routes)('`$method` exists on $path', (route) => {
            expect(orderRoutes.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).toBe(true)
            expect(orderRoutes.stack.some((s) => s.route.path === route.path)).toBe(true)
          });
    });

    describe('/order/:userId/recent', () => {
        it('should return 200 and order array', async () => {

            const orderResponse: Array<IOrder> = [ 
                {
                    _id: 'testMenuId', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                },
                {
                    _id: 'testMenuIdTwo', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                },

            ];

            const getOrdersSpy = jest.spyOn(OrderService.prototype, 'getUserOrders').mockImplementation((id) =>{ 
                return id === 'userIdTest' ? Promise.resolve(orderResponse) : Promise.resolve([])
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/order/userIdTest/recent').expect(200);

            expect(getOrdersSpy).toHaveBeenCalledWith('userIdTest')
            expect(body).toEqual(orderResponse);
        });
    });

    describe('/order/:orderId', () => {
        it('should return 200 and order', async () => {
            const orderResponse: IOrder = 
                {
                    _id: 'testMenuId', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                };

            const getOrdersSpy = jest.spyOn(OrderService.prototype, 'getOrder').mockImplementation((id) =>{ 
                return id === 'orderIdTest' ? Promise.resolve(orderResponse) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/order/orderIdTest').expect(200);

            expect(getOrdersSpy).toHaveBeenCalledWith('orderIdTest')
            expect(body).toEqual(orderResponse);
        });

        it('should return 404', async () => {
            const orderResponse: IOrder = 
            {
                _id: 'testMenuId', 
                userId: 'userOne', 
                restaurant: {
                    name: 'namee', description: 'restaurant Descitpion'
                }, 
                active: true , 
                total: 1, 
                address: {
                    addresslineOne: 'one', postcode: 'postcode'
                },
                stage: 'recieved'
            };

        const getOrdersSpy = jest.spyOn(OrderService.prototype, 'getOrder').mockImplementation((id) =>{ 
            return id === 'orderIdTest' ? Promise.resolve(orderResponse) : Promise.resolve(null)
        } )

        const {body, statusCode} = await supertest(app).get('/api/v1/order/orderIdTestWrong').expect(404);

        expect(getOrdersSpy).toHaveBeenCalledWith('orderIdTestWrong')
        expect(body).toEqual({});

        });
    });

    describe('/order/:restaurantId/active', () => {
        it('should return 200 and order array', async () => {
            const orderResponse: Array<IOrder> = [ 
                {
                    _id: 'testMenuId', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                },
                {
                    _id: 'testMenuIdTwo', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                },

            ];

            const getOrdersSpy = jest.spyOn(OrderService.prototype, 'getActiveOrders').mockImplementation((id) =>{ 
                return id === 'restaurantIdTest' ? Promise.resolve(orderResponse) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/order/restaurantIdTest/active').expect(200);

            expect(getOrdersSpy).toHaveBeenCalledWith('restaurantIdTest')
            expect(body).toEqual(orderResponse);
        });

        it('should return 404', async () => {
            const orderResponse: Array<IOrder> = [ 
                {
                    _id: 'testMenuId', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                },
                {
                    _id: 'testMenuIdTwo', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                },

            ];

            const getOrdersSpy = jest.spyOn(OrderService.prototype, 'getActiveOrders').mockImplementation((id) =>{ 
                return id === 'userIdTest' ? Promise.resolve(orderResponse) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/order/restaurantIdTestWrong/active').expect(404);

            expect(getOrdersSpy).toHaveBeenCalledWith('restaurantIdTestWrong')
            expect(body).toEqual({});
        });
    });

    describe('/order', () => {
        it('should return 200 and order', async () => {
            const order: IOrder =  
                {
                    _id: '', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                };

                const orderExpectedResponse: IOrder =  
                {
                    _id: 'addedId', 
                    userId: 'userOne', 
                    restaurant: {
                        name: 'namee', description: 'restaurant Descitpion'
                    }, 
                    active: true , 
                    total: 1, 
                    address: {
                        addresslineOne: 'one', postcode: 'postcode'
                    },
                    stage: 'recieved'
                };

            const getOrdersSpy = jest.spyOn(OrderService.prototype, 'addOrder').mockImplementation((order) =>{ 
                let orderCopy = JSON.parse(JSON.stringify(order));
                orderCopy._id = 'addedId'

                return Promise.resolve(orderCopy);
            } )

            const {body, statusCode} = await supertest(app).post('/api/v1/order/').send(order).expect(201);

            expect(getOrdersSpy).toHaveBeenCalledWith(order)
            expect(body).toEqual(orderExpectedResponse);
        });
    });

    describe('/order/:orderId', () => {
        it('should return 204', async () => {
            const deleteOrdersSpy = jest.spyOn(OrderService.prototype, 'deleteOrder').mockImplementation((orderId) =>{ 
                return orderId === 'orderIdDelete'? Promise.resolve(true): Promise.resolve(false);
            } )

            const {body, statusCode} = await supertest(app).delete('/api/v1/order/orderIdDelete').expect(204);

            expect(deleteOrdersSpy).toHaveBeenCalledWith('orderIdDelete')
        });
    });
});