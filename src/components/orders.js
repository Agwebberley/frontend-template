
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const OrdersList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="customer_id" reference="customers" />
<TextField source="order_date" />
<TextField source="total_amount" />
<TextField source="status" />
<TextField source="created_at" />
<TextField source="updated_at" />
            <EditButton basePath="/orders" />
            <DeleteButton basePath="/orders" />
        </Datagrid>
    </List>
);

export const OrdersEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Details">
                <TextInput source="id" disabled />

        <ReferenceInput source="customer_id" reference="customers">
            <SelectInput optionText="id" />
        </ReferenceInput>
<TextInput source="order_date" />
<NumberInput source="total_amount" />
<TextInput source="status" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </FormTab>
            
    <ArrayInput source="order_items">
        <SimpleFormIterator>
            <TextInput source="id" disabled />

        <ReferenceInput source="order_id" reference="orders">
            <SelectInput optionText="id" />
        </ReferenceInput>

        <ReferenceInput source="part_id" reference="parts">
            <SelectInput optionText="id" />
        </ReferenceInput>
<NumberInput source="quantity" />
<NumberInput source="unit_price" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
        </SimpleFormIterator>
    </ArrayInput>
        </TabbedForm>
    </Edit>
);

export const OrdersCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

        <ReferenceInput source="customer_id" reference="customers">
            <SelectInput optionText="id" />
        </ReferenceInput>
<TextInput source="order_date" />
<NumberInput source="total_amount" />
<TextInput source="status" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            
    <ArrayInput source="order_items">
        <SimpleFormIterator>
            <TextInput source="id" disabled />

        <ReferenceInput source="order_id" reference="orders">
            <SelectInput optionText="id" />
        </ReferenceInput>

        <ReferenceInput source="part_id" reference="parts">
            <SelectInput optionText="id" />
        </ReferenceInput>
<NumberInput source="quantity" />
<NumberInput source="unit_price" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
        </SimpleFormIterator>
    </ArrayInput>
        </SimpleForm>
    </Create>
);
