
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const PartsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="name" />
<TextField source="description" />
<TextField source="price" />
<TextField source="stock_quantity" />
<TextField source="created_at" />
<TextField source="updated_at" />
            <EditButton basePath="/parts" />
            <DeleteButton basePath="/parts" />
        </Datagrid>
    </List>
);

export const PartsEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Details">
                <TextInput source="id" disabled />
<TextInput source="name" />
<TextInput source="description" />
<NumberInput source="price" />
<NumberInput source="stock_quantity" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </FormTab>
            
        </TabbedForm>
    </Edit>
);

export const PartsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
<TextInput source="name" />
<TextInput source="description" />
<NumberInput source="price" />
<NumberInput source="stock_quantity" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            
        </SimpleForm>
    </Create>
);
