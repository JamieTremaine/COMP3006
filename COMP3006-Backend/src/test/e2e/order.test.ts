import supertest from "supertest";
import { app } from "../../server";
import { OrderModel } from "../../model/order";
import { getOrder, multipleOrders } from "./util/order.util";
import { MenuModel } from "../../model/menu";
import { getMenuWithId } from "./util/menu.util";

describe('order e2e', () => {

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get users most recent orders', async () => {
        const orders = multipleOrders();

        OrderModel.find = jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(orders)
            })
        })
        const { body } = await supertest(app).get('/api/v1/order/659845831000f466ee24caac/recent').expect(200);

        expect(body).toEqual(orders);
    })

    it('should get a single order by id', async () => {
        const order = getOrder();

        OrderModel.findById = jest.fn().mockImplementation((id) => {
            return id === '6538a5dc1200a426ee24cb4d' ? Promise.resolve(order) : Promise.resolve(null);
        });

        const { body } = await supertest(app).get('/api/v1/order/6538a5dc1200a426ee24cb4d').expect(200);

        expect(body).toEqual(order);
    });

    it('should get a restaurants active orders', async () => {
        const order = getOrder();

        OrderModel.findById = jest.fn().mockImplementation((id) => {
            return id === '6538a5dc1200a426ee24cb4d' ? Promise.resolve(order) : Promise.resolve(null);
        });

        const { body } = await supertest(app).get('/api/v1/order/6538a5dc1200a426ee24cb4d').expect(200);

        expect(body).toEqual(order);
    });

    it('should delete order', async () => {

        const order = getOrder();

        OrderModel.findByIdAndDelete = jest.fn().mockImplementation((id) => {
            return id === '6538a5dc1200a426ee24cb4d' ? Promise.resolve(order) : Promise.resolve(null);
        });

        await supertest(app).delete('/api/v1/order/6538a5dc1200a426ee24cb4d').expect(204);
    });
});