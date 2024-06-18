import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { createBrowserHistory as createHistory } from 'history';

import { CustomersList, CustomersEdit, CustomersCreate } from './components/customers';
import { PartsList, PartsEdit, PartsCreate } from './components/parts';
import { OrdersList, OrdersEdit, OrdersCreate } from './components/orders';
import { OrderItemsList, OrderItemsEdit, OrderItemsCreate } from './components/order_items';

const dataProvider = simpleRestProvider('http://localhost:8000/api'); // Adjust URL to your Django REST API
const history = createHistory();

const App = () => (
    <Admin history={history} dataProvider={dataProvider}>
        <Resource name="customers" list={CustomersList} edit={CustomersEdit} create={CustomersCreate} />
        <Resource name="parts" list={PartsList} edit={PartsEdit} create={PartsCreate} />
        <Resource name="orders" list={OrdersList} edit={OrdersEdit} create={OrdersCreate} />
        <Resource name="order_items" list={OrderItemsList} edit={OrderItemsEdit} create={OrderItemsCreate} />
    </Admin>
);

export default App;
