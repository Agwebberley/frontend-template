
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const OrderList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="customer_id" reference="customer" />
<TextField source="order_date" />
<TextField source="total_amount" />
<TextField source="status" />
<TextField source="created_at" />
<TextField source="updated_at" />
            <EditButton basePath="/order" />
            <DeleteButton basePath="/order" />
        </Datagrid>
    </List>
);

export const OrderEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled />

        <ReferenceInput source="customer_id" reference="customer">
            <SelectInput optionText="id" />
        </ReferenceInput>
<DateInput source="order_date" />
<NumberInput source="total_amount" />
<TextInput source="status" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </TabbedForm.Tab>
        <TabbedForm.Tab label="Order Items">
            
    <ArrayInput source="order_item">
        <SimpleFormIterator>
            <TextInput source="id" disabled />

        <ReferenceInput source="order_id" reference="order">
            <SelectInput optionText="id" />
        </ReferenceInput>

        <ReferenceInput source="part_id" reference="part">
            <SelectInput optionText="id" />
        </ReferenceInput>
<NumberInput source="quantity" />
<NumberInput source="unit_price" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
        </SimpleFormIterator>
    </ArrayInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);

export const OrderCreate = props => (
    <Create {...props}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled />

                <ReferenceInput source="customer_id" reference="customer">
                    <SelectInput optionText="id" />
                </ReferenceInput>

                <DateInput source="order_date" />
                <NumberInput source="total_amount" />
                <TextInput source="status" />
                <TextInput source="created_at" disabled />
                <TextInput source="updated_at" disabled />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Order Items">
                <ArrayInput source="order_item">
                    <SimpleFormIterator>
                        <TextInput source="id" disabled />

                        <ReferenceInput source="order_id" reference="order">
                            <SelectInput optionText="id" />
                        </ReferenceInput>

                        <ReferenceInput source="part_id" reference="part">
                            <SelectInput optionText="id" />
                        </ReferenceInput>
                        <NumberInput source="quantity" />
                        <NumberInput source="unit_price" />
                        <TextInput source="created_at" disabled />
                        <TextInput source="updated_at" disabled />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);
