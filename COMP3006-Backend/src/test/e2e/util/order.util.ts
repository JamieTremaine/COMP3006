import { IOrder } from "../../../model/order";

export function multipleOrders(): Array<IOrder> {
    const orders = [
        {
          "_id": "6538a5dc1200a426ee24cb4d",
          "userId": "659845831000f466ee24caac",
          "restaurant": {
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "currentMenuId": "659845831000f466ee24ca23",
            "_id": "659845831000f466ee24ca19",
            "__v": 0
          },
          "items": [
            {
              "name": "The small not so cheesy",
              "itemTypes": [
                "featured",
                "burgers"
              ],
              "price": 5.21,
              "allegens": [
                "sesame seeds"
              ],
              "nutritionalInfo": {
                "calories": 820,
                "_id": "659845831000f466ee24ca25"
              },
              "extras": [
                {
                  "name": "Remove",
                  "extras": [
                    {
                      "name": "No bacon",
                      "_id": "659845dc1000f466ee24cb51"
                    },
                    {
                      "name": "No cheese",
                      "_id": "659845dc1000f466ee24cb52"
                    }
                  ],
                  "_id": "659845dc1000f466ee24cb50"
                }
              ],
              "_id": "659845831000f466ee24ca24"
            },
            {
              "name": "15 chicken nuggets",
              "itemTypes": [
                "nuggets"
              ],
              "price": 6.1,
              "allegens": [],
              "nutritionalInfo": {
                "calories": 810,
                "_id": "659845831000f466ee24ca35"
              },
              "extras": [
                {
                  "name": "Dips",
                  "extras": [
                    {
                      "name": "Ketchup",
                      "_id": "659845dc1000f466ee24cb56"
                    }
                  ],
                  "_id": "659845dc1000f466ee24cb55"
                }
              ],
              "_id": "659845831000f466ee24ca34"
            }
          ],
          "total": 11.309999999999999,
          "active": true,
          "address": {
            "addresslineOne": "263 Manchester Road",
            "postcode": "TR91 8OL",
            "_id": "659845831000f466ee24caad"
          },
          "stage": "recieved",
          "__v": 0
        },
        {
            "_id": "659845dc1000f466ee24cb4c",
            "userId": "659845831000f466ee24caac",
            "restaurant": {
              "description": "Guaranteed speed without a clown in sight",
              "name": "McRonalds",
              "restaurantType": [
                "american",
                "burger",
                "chicken"
              ],
              "currentMenuId": "659845831000f466ee24ca23",
              "_id": "659845831000f466ee24ca19",
              "__v": 0
            },
            "items": [
              {
                "name": "The small not so cheesy",
                "itemTypes": [
                  "featured",
                  "burgers"
                ],
                "price": 5.21,
                "allegens": [
                  "sesame seeds"
                ],
                "nutritionalInfo": {
                  "calories": 820,
                  "_id": "659845831000f466ee24ca25"
                },
                "extras": [
                  {
                    "name": "Remove",
                    "extras": [
                      {
                        "name": "No bacon",
                        "_id": "659845dc1000f466ee24cb51"
                      },
                      {
                        "name": "No cheese",
                        "_id": "659845dc1000f466ee24cb52"
                      }
                    ],
                    "_id": "659845dc1000f466ee24cb50"
                  }
                ],
                "_id": "659845831000f466ee24ca24"
              },
              {
                "name": "15 chicken nuggets",
                "itemTypes": [
                  "nuggets"
                ],
                "price": 6.1,
                "allegens": [],
                "nutritionalInfo": {
                  "calories": 810,
                  "_id": "659845831000f466ee24ca35"
                },
                "extras": [
                  {
                    "name": "Dips",
                    "extras": [
                      {
                        "name": "Ketchup",
                        "_id": "659845dc1000f466ee24cb56"
                      }
                    ],
                    "_id": "659845dc1000f466ee24cb55"
                  }
                ],
                "_id": "659845831000f466ee24ca34"
              }
            ],
            "total": 11.309999999999999,
            "active": true,
            "address": {
              "addresslineOne": "263 Manchester Road",
              "postcode": "TR91 8OL",
              "_id": "659845831000f466ee24caad"
            },
            "stage": "recieved",
            "__v": 0
          }   
      ]

      return JSON.parse(JSON.stringify(orders));
}

export function getOrder(): IOrder {
  const order = {
    "_id": "6538a5dc1200a426ee24cb4d",
    "userId": "659845831000f466ee24caac",
    "restaurant": {
      "description": "Guaranteed speed without a clown in sight",
      "name": "McRonalds",
      "restaurantType": [
        "american",
        "burger",
        "chicken"
      ],
      "currentMenuId": "659845831000f466ee24ca23",
      "_id": "659845831000f466ee24ca19",
      "__v": 0
    },
    "items": [
      {
        "name": "The small not so cheesy",
        "itemTypes": [
          "featured",
          "burgers"
        ],
        "price": 5.21,
        "allegens": [
          "sesame seeds"
        ],
        "nutritionalInfo": {
          "calories": 820,
          "_id": "659845831000f466ee24ca25"
        },
        "extras": [
          {
            "name": "Remove",
            "extras": [
              {
                "name": "No bacon",
                "_id": "659845dc1000f466ee24cb51"
              },
              {
                "name": "No cheese",
                "_id": "659845dc1000f466ee24cb52"
              }
            ],
            "_id": "659845dc1000f466ee24cb50"
          }
        ],
        "_id": "659845831000f466ee24ca24"
      },
      {
        "name": "15 chicken nuggets",
        "itemTypes": [
          "nuggets"
        ],
        "price": 6.1,
        "allegens": [],
        "nutritionalInfo": {
          "calories": 810,
          "_id": "659845831000f466ee24ca35"
        },
        "extras": [
          {
            "name": "Dips",
            "extras": [
              {
                "name": "Ketchup",
                "_id": "659845dc1000f466ee24cb56"
              }
            ],
            "_id": "659845dc1000f466ee24cb55"
          }
        ],
        "_id": "659845831000f466ee24ca34"
      }
    ],
    "total": 11.309999999999999,
    "active": true,
    "address": {
      "addresslineOne": "263 Manchester Road",
      "postcode": "TR91 8OL",
      "_id": "659845831000f466ee24caad"
    },
    "stage": "recieved",
    "__v": 0
  }

  return JSON.parse(JSON.stringify(order));
}