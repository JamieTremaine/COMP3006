import { IMenu } from "../../../model/menu";

export function getMenuNoId(): IMenu {
    const menu = {
        "restaurantId": "6592122ce52f99e1b07899dc",
        "restaurantName": "McRonalds",
        "MenuItems": [
          {
            "name": "The small not so cheesy",
            "itemTypes": [
              "featured",
              "burgers"
            ],
            "image": null,
            "descipiption": "22% beef patty, one slice of cheese, red onions, bacon and ketchup",
            "price": 5.21,
            "allegens": [
              "sesame seeds"
            ],
            "nutritionalInfo": {
              "calories": 820
            },
            "extras": [
              {
                "required": false,
                "name": "Remove",
                "extras": [
                  {
                    "name": "No onions",
                    "nutritionalInfo": {
                      "calories": 29
                    }
                  },
                  {
                    "name": "No bacon",
                    "nutritionalInfo": {
                      "calories": 19
                    }
                  },
                  {
                    "name": "No cheese",
                    "nutritionalInfo": {
                      "calories": 59
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "RonCrispy",
            "itemTypes": [
              "featured",
              "burgers",
              "chicken"
            ],
            "image": null,
            "descipiption": "200% chicken breast, pepper mayo and sourdough",
            "price": 5.9,
            "allegens": [],
            "nutritionalInfo": {
              "calories": 422
            },
            "extras": [
              {
                "required": false,
                "name": "remove",
                "extras": [
                  {
                    "name": "no mayo",
                    "nutritionalInfo": {
                      "calories": 45
                    }
                  },
                  {
                    "name": "no lettuce",
                    "nutritionalInfo": {
                      "calories": 3
                    }
                  },
                  {
                    "name": "no bun",
                    "nutritionalInfo": {
                      "calories": 47
                    }
                  }
                ]
              },
              {
                "required": false,
                "name": "extra",
                "extras": [
                  {
                    "name": "extra mayo",
                    "nutritionalInfo": {
                      "calories": 45
                    }
                  },
                  {
                    "name": "extra lettuce",
                    "nutritionalInfo": {
                      "calories": 3
                    }
                  },
                  {
                    "name": "extra bun",
                    "nutritionalInfo": {
                      "calories": 47
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "15 chicken nuggets",
            "itemTypes": [
              "nuggets"
            ],
            "image": null,
            "descipiption": "15 piece nuggets",
            "price": 6.1,
            "allegens": [],
            "nutritionalInfo": {
              "calories": 810
            },
            "extras": [
              {
                "required": true,
                "minimumRequired": 1,
                "max": 3,
                "name": "Dips",
                "extras": [
                  {
                    "name": "Ketchup",
                    "nutritionalInfo": {
                      "calories": 5
                    }
                  },
                  {
                    "name": "BBQ",
                    "nutritionalInfo": {
                      "calories": 5
                    }
                  },
                  {
                    "name": "Sweet Curry",
                    "nutritionalInfo": {
                      "calories": 6
                    }
                  },
                  {
                    "name": "Sweet & Sour",
                    "nutritionalInfo": {
                      "calories": 4
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "9 chicken nuggets",
            "itemTypes": [
              "nuggets"
            ],
            "image": null,
            "descipiption": "9 piece nuggets",
            "price": 5.1,
            "allegens": [],
            "nutritionalInfo": {
              "calories": 510
            },
            "extras": [
              {
                "required": true,
                "minimumRequired": 1,
                "max": 3,
                "name": "Dips",
                "extras": [
                  {
                    "name": "Ketchup",
                    "nutritionalInfo": {
                      "calories": 5
                    }
                  },
                  {
                    "name": "BBQ",
                    "nutritionalInfo": {
                      "calories": 5
                    }
                  },
                  {
                    "name": "Sweet Curry",
                    "nutritionalInfo": {
                      "calories": 6
                    }
                  },
                  {
                    "name": "Sweet & Sour",
                    "nutritionalInfo": {
                      "calories": 4
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "6 chicken nuggets",
            "itemTypes": [
              "nuggets"
            ],
            "image": null,
            "descipiption": "6 piece nuggets",
            "price": 4.1,
            "allegens": [],
            "nutritionalInfo": {
              "calories": 310
            },
            "extras": [
              {
                "required": true,
                "minimumRequired": 1,
                "max": 3,
                "name": "Dips",
                "extras": [
                  {
                    "name": "Ketchup",
                    "nutritionalInfo": {
                      "calories": 5
                    }
                  },
                  {
                    "name": "BBQ",
                    "nutritionalInfo": {
                      "calories": 5
                    }
                  },
                  {
                    "name": "Sweet Curry",
                    "nutritionalInfo": {
                      "calories": 6
                    }
                  },
                  {
                    "name": "Sweet & Sour",
                    "nutritionalInfo": {
                      "calories": 4
                    }
                  }
                ]
              }
            ]
          }
        ]
      }

      //return new object each time
      return JSON.parse(JSON.stringify(menu));
}

export function getMenuWithId(): IMenu {
    const menu = {
        "_id": "6592122de52f99e1b07899e6",
        "restaurantId": "6592122de52f99e1b07899e2",
        "restaurantName": "Mama Bettys",
        "MenuItems": [
            {
            "name": "Platter for 2",
            "itemTypes": [
                "platter"
            ],
            "price": 20.21,
            "allegens": [],
            "nutritionalInfo": {
                "calories": 820,
                "_id": "6592122de52f99e1b0789a59"
            },
            "extras": [],
            "_id": "6592122de52f99e1b0789a58"
            },
            {
            "name": "Platter for 4",
            "itemTypes": [
                "platter"
            ],
            "price": 25.21,
            "allegens": [],
            "nutritionalInfo": {
                "calories": 1020,
                "_id": "6592122de52f99e1b0789a5b"
            },
            "extras": [],
            "_id": "6592122de52f99e1b0789a5a"
            },
            {
            "name": "Platter for 5",
            "itemTypes": [
                "platter"
            ],
            "price": 27.11,
            "allegens": [],
            "nutritionalInfo": {
                "calories": 1020,
                "_id": "6592122de52f99e1b0789a5d"
            },
            "extras": [],
            "_id": "6592122de52f99e1b0789a5c"
            },
            {
            "name": "Platter for 7",
            "itemTypes": [
                "platter"
            ],
            "price": 29.14,
            "allegens": [],
            "nutritionalInfo": {
                "calories": 1220,
                "_id": "6592122de52f99e1b0789a5f"
            },
            "extras": [],
            "_id": "6592122de52f99e1b0789a5e"
            },
            {
            "name": "Doner",
            "itemTypes": [
                "Kebab"
            ],
            "price": 7.14,
            "allegens": [],
            "nutritionalInfo": {
                "calories": 264,
                "_id": "6592122de52f99e1b0789a61"
            },
            "extras": [],
            "_id": "6592122de52f99e1b0789a60"
            },
            {
            "name": "Chicken Doner",
            "itemTypes": [
                "Kebab"
            ],
            "price": 8.14,
            "allegens": [],
            "nutritionalInfo": {
                "calories": 274,
                "_id": "6592122de52f99e1b0789a63"
            },
            "extras": [],
            "_id": "6592122de52f99e1b0789a62"
            }
        ],
        "__v": 0
    };

    //return new object each time
    return JSON.parse(JSON.stringify(menu));
}