import { faker } from '@faker-js/faker';
import itemsApriori from "../../fixtures/crear-pagina/apriori_mock_data.json";



const getItem = async (items) => await items[Math.floor(Math.random()*items.length)]

const fetchDataFaker = () =>  {
    const items = Array.from({ length: 100 }, () => ({
        "pageTitle":faker.person.fullName(),
        "pageDescription": faker.string.alpha({ length: { min: 5, max: 200 } })
    }));

    return getItem(items);
}

async function fetchDataMookaro ()  {
    const fetData = async ()=>{
        return await fetch("https://my.api.mockaroo.com/crear_pagina.json?key=a1b8da20",
        {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }}).then(res=>{
        return res
            .json()
            .then((json) => ({ status: res.status, response: json }))
        })
    }

    const {response} =  await fetData()
    return getItem(response);
}

const fetchData = async () => {
    let item;
    switch (Cypress.env('POOL_DATA')) {
        case 'random':
            item =  await fetchDataFaker()
        case 'dynamic':
            item = await fetchDataMookaro()
        default:
            item =  getItem(itemsApriori)
    }
    return item
}

export default  fetchData;