
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const Order_itemsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="order_id" reference="orders" />
<TextField source="part_id" reference="parts" />
<TextField source="quantity" />
<TextField source="unit_price" />
<TextField source="created_at" />
<TextField source="updated_at" />
            <EditButton basePath="/order_items" />
            <DeleteButton basePath="/order_items" />
        </Datagrid>
    </List>
);

export const Order_itemsEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Details">
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
            </FormTab>
            
        </TabbedForm>
    </Edit>
);

export const Order_itemsCreate = props => (
    <Create {...props}>
        <SimpleForm>
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
            
        </SimpleForm>
    </Create>
);
