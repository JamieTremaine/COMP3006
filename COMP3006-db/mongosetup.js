const serverUrl = "http://localhost:3000/api/v1";

addData();

async function addData() {
    await addRestaurants().then(()=>{
        addMenus();
        addUsers();
    });
}

async function addUsers() {
    const restaurantPromise = await fetch(`${serverUrl}/restaurant/get/all`);
    const restaurants = await restaurantPromise.json();

    const users = [
        { username: 'userOne', password: 'passwordOne', type: 'user', addresses: [
            { addresslineOne: '263 Manchester Road', postcode : 'TR91 8OL' }, { addresslineOne: '26 London Road', addresslineTwo: 'HEMEL HEMPSTEAD', postcode : 'HP46 4ED' }
        ]},
        { username: 'userTwo', password: 'passwordTwo',type: 'user', addresses: [{addresslineOne: '41 Albert Road', postcode : 'E75 9BS'}]},
        { username: 'restaurantOne', password: 'passwordOne', type: 'restaurant', restaurantId: restaurants[0]._id},
        { username: 'restaurantTwo', password: 'passwordTwo', type: 'restaurant', restaurantId: restaurants[1]._id}
    ]

    users.forEach((user) => {
        fetch(`${serverUrl}/user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
    });

}

async function addRestaurants() {
    const restaurantsInput = [
        { name: 'McRonalds', description: 'Guaranteed speed without a clown in sight', restaurantType: ['american', 'burger', 'chicken']},
        { name: 'Plymouth fried chicken', description: 'Don\'t lick your fingers you don\'t know where they\'ve been', restaurantType: ['american', 'burger', 'chicken']},
        { name: 'Mama Betty\s', description: '', restaurantType: ['pizza']},
        { name: 'Totally Original Charcoal Grill', description: 'Only 15 of us in the city!', restaurantType: ['bbq', 'burger', 'chicken']}
    ]
    
    let promises = [];
    restaurantsInput.forEach(async (restaurant) =>{
        const promsie = fetch(`${serverUrl}/restaurant`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(restaurant)
        });
    
        promises.push(promsie);
    })
    
    return await Promise.all(promises);
}

async function addMenus() {
    const restaurantPromise = await fetch(`${serverUrl}/restaurant/get/all`);
    const restaurants = await restaurantPromise.json();

    const menus = require('./menus.json')

    restaurants.forEach((restaurant, idx) => {
        const id = restaurant._id;
        const name = restaurant.name;

        let menu = menus[idx];
        menu.restaurantId = id;
        menu.restaurantName = name;

        fetch(`${serverUrl}/menu`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(menu)
        }).then(async (menu) => {
            const result = await menu.json();
            restaurant.currentMenuId = result._id;
            fetch(`${serverUrl}/restaurant/${restaurant._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(restaurant)
            })
        });
    });
}