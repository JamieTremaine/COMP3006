import { IOrder, OrderModel } from "../../../src/model/order";
import { UserModel } from "../../../src/model/user";
import { OrderService } from "../../../src/svc/order.service";

describe('order service', () =>{
    const orderService = new OrderService();
    
    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get user orders', async () => {
        const orders: Array<IOrder> = [
            {
                _id: 'orderOneid', 
                userId: 'userId', 
                restaurant: {
                    name: 'restaurantName', description: 'restaurantDescription'
                }, 
                total: 1,
                active: false,
                stage: 'delivered',
                address: {
                    addresslineOne: 'one',
                    postcode: 'post'
                }
            },
            {
                _id: 'orderTwoid', 
                userId: 'userId', 
                restaurant: {
                    name: 'restaurantName', description: 'restaurantDescription'
                }, 
                total: 1,
                active: false,
                stage: 'delivered',
                address: {
                    addresslineOne: 'one',
                    postcode: 'post'
                }
            }
        ]

        OrderModel.find = jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(orders)
            })
        })

        let result = await orderService.getUserOrders('userId');
        expect(result).toEqual(orders);
    });

    it('should get order', async () => {
        const order: IOrder =
            {
                _id: 'orderId', 
                userId: 'userId', 
                restaurant: {
                    name: 'restaurantName', description: 'restaurantDescription'
                }, 
                total: 1,
                active: false,
                stage: 'delivered',
                address: {
                    addresslineOne: 'one',
                    postcode: 'post'
                }
            };

        OrderModel.findById = jest.fn().mockImplementation((id: string)=> {
            return id === 'orderId' ? Promise.resolve(order): Promise.resolve(null)
        });
        
        let result = await orderService.getOrder('orderId');

        expect(result).toEqual(order);
    });

    it('should get active orders', async () => {
        const order: IOrder =
            {
                _id: 'orderId', 
                userId: 'userId', 
                restaurant: {
                    _id: '5d273f9ed58f5e7093b549b0',
                    name: 'restaurantName', description: 'restaurantDescription'
                }, 
                total: 1,
                active: false,
                stage: 'delivered',
                address: {
                    addresslineOne: 'one',
                    postcode: 'post'
                }
            };

        OrderModel.find = jest.fn().mockImplementation(()=> {
            return Promise.resolve(order)
        });
        
        let result = await orderService.getActiveOrders('5d273f9ed58f5e7093b549b0');

        expect(result).toEqual(order);
    });

    it('should get add order', async () => {
        const order: IOrder =
            {
                _id: '', 
                userId: 'userId', 
                restaurant: {
                    name: 'restaurantName', description: 'restaurantDescription'
                }, 
                total: 0,
                active: false,
                stage: '',
                address: {
                    addresslineOne: 'one',
                    postcode: 'post'
                }
            };

            const createdOrder: IOrder =
            {
                _id: 'created', 
                userId: 'userId', 
                restaurant: {
                    name: 'restaurantName', description: 'restaurantDescription'
                }, 
                total: 100,
                active: true,
                stage: 'recieved',
                address: {
                    addresslineOne: 'one',
                    postcode: 'post'
                }
            };

        OrderModel.findById = jest.fn().mockImplementation((id: string)=> {
            return id === '5d273f9ed58f5e7093b549b0' ? Promise.resolve(order): Promise.resolve(null)
        });

        jest.spyOn(orderService as any, 'verifyOrder').mockReturnValue(Promise.resolve(true));

        OrderModel.create = jest.fn().mockImplementation((id: string)=> {
            return Promise.resolve(createdOrder)
        });

        UserModel.findOne = jest.fn().mockImplementation(()=> {
            return Promise.resolve(null)
        });
        
        let result = await orderService.addOrder(order);

        expect(result).toEqual(createdOrder);
    });

    it('should delete order', async () => {

        OrderModel.findByIdAndDelete = jest.fn().mockImplementation((id) => {
            return id === '5d273f9ed58f5e7093b549b0' ? Promise.resolve({value: '1'}) : Promise.resolve({value: null})
        });
        
        let result = await orderService.deleteOrder('5d273f9ed58f5e7093b549b0');

        expect(result).toEqual(true);
    });
});