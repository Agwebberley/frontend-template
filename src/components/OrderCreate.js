import React from 'react';
import {
    Create,
    TabbedForm,
    FormTab,
    TextInput,
    SaveButton,
    Toolbar,
    useCreate,
    useRedirect,
    useNotify,
    ReferenceInput,
    SelectInput,
    DateInput
} from 'react-admin';
import OrderItemList from './OrderItemList';

const OrderCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);

const OrderCreate = props => {
    const [create, { loading }] = useCreate('orders');
    const redirect = useRedirect();
    const notify = useNotify();

    const handleSave = async values => {
        const { order_items, ...orderData } = values;

        try {
            const { data: createdOrder } = await create(
                { payload: { data: orderData } },
                { returnPromise: true }
            );

            if (order_items && order_items.length) {
                const orderItemsData = order_items.map(item => ({
                    ...item,
                    order_id: createdOrder.id
                }));
                
                for (const orderItem of orderItemsData) {
                    await create(
                        { payload: { data: orderItem, resource: 'order_items' } },
                        { returnPromise: true }
                    );
                }
            }

            notify('Order created successfully', 'info');
            redirect('list', props.basePath);
        } catch (error) {
            notify('Error: could not create order', 'warning');
        }
    };

    return (
        <Create {...props}>
            <TabbedForm onSubmit={handleSave} toolbar={<OrderCreateToolbar />}>
                <FormTab label="Details">
                <ReferenceInput source="customer_id" reference="customer">
                    <SelectInput optionText="id" />
                </ReferenceInput>
                    <DateInput source="order_date" label="Order Date" />
                    <TextInput source="status" label="Status" />
                </FormTab>
                <FormTab label="Order Items">
                    <OrderItemList />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default OrderCreate;
