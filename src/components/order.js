
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const OrderList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="customer_id" reference="customer" />
<TextField source="order_date" />
<TextField source="total" />
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
<TextInput source="status" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="order item">
    <ArrayInput source="order_item">
        <SimpleFormIterator>
            <TextInput source="id" disabled />

        <ReferenceInput source="part_id" reference="part">
            <SelectInput optionText="id" />
        </ReferenceInput>
<NumberInput source="quantity" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
        </SimpleFormIterator>
    </ArrayInput></TabbedForm.Tab>
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
<TextInput source="status" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </TabbedForm.Tab>

        <TabbedForm.Tab label="order_item">
    <ArrayInput source="order_item">
        <SimpleFormIterator>
            <TextInput source="id" disabled />
        <ReferenceInput source="part_id" reference="part">
            <SelectInput optionText="id" />
        </ReferenceInput>
<NumberInput source="quantity" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
        </SimpleFormIterator>
    </ArrayInput></TabbedForm.Tab></TabbedForm>
    </Create>
);
