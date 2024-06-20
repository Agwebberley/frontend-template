import { CustomerList, CustomerEdit, CustomerCreate } from './components/customer';
import { PartList, PartEdit, PartCreate } from './components/part';
import { OrderList, OrderEdit, OrderCreate, OrderShow } from './components/order';
import { MainLayout } from './components/layout';
import { fetchUtils, Admin, Resource} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { BrowserRouter as Router } from 'react-router-dom';
import authProvider from './authProvider';
import Dashboard from './components/dashboard';


const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const httpClient = async (url, options = {}) => {
    if (!url.endsWith('/')) {
        url += '/';
    }
    options.headers = new Headers({ Accept: 'application/json' });
    if (options.method === "POST" || options.method === "PUT") {
        options.headers.append('X-CSRFToken', getCookie('csrftoken'));
    }

    // Auth
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);

    const response = await fetchUtils.fetchJson(url, options);
    const { headers, json } = response;
    return { headers, json };
};

const dataProvider = simpleRestProvider('/api', httpClient);

const myDataProvider = {
    ...dataProvider,
    getList: async (resource, params) => {
        const response = await dataProvider.getList(resource, params);

        //const data = response.json.results ? response.json.results : [];
        const total = response.data.results.length > 0 ? response.data.results[0].total : 0;
        return {
            data: response.data.results,
            total: total
        };
    },
    getMany: async (resource, params) => {
        const response = await dataProvider.getMany(resource, params);
        return {
            data: response.data.results
        };
    }
};

const App = () => {
    return (
        <Router>
            <Admin authProvider={authProvider} 
            dataProvider={myDataProvider}
            layout={MainLayout} 
            darkTheme={{ palette: { mode: 'dark' } }}
            dashboard={Dashboard}
            >
                <Resource name="customer" list={CustomerList} edit={CustomerEdit} create={CustomerCreate} />
                <Resource name="part" list={PartList} edit={PartEdit} create={PartCreate} />
                <Resource name="order" list={OrderList} edit={OrderEdit} create={OrderCreate} show={OrderShow} />
            </Admin>
        </Router>
    );
};

export default App;