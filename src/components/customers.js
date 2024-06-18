
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const CustomersList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="name" />
<TextField source="email" />
<TextField source="phone" />
<TextField source="created_at" />
<TextField source="updated_at" />
            <EditButton basePath="/customers" />
            <DeleteButton basePath="/customers" />
        </Datagrid>
    </List>
);

export const CustomersEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Details">
                <TextInput source="id" disabled />
<TextInput source="name" />
<TextInput source="email" />
<TextInput source="phone" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </FormTab>
            
        </TabbedForm>
    </Edit>
);

export const CustomersCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
<TextInput source="name" />
<TextInput source="email" />
<TextInput source="phone" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            
        </SimpleForm>
    </Create>
);
