
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const CustomerList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
<TextField source="name" />
<TextField source="email" />
<TextField source="phone" />
<TextField source="created_at" />
<TextField source="updated_at" />
            <EditButton basePath="/customer" />
            <DeleteButton basePath="/customer" />
        </Datagrid>
    </List>
);

export const CustomerEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled />
<TextInput source="name" />
<TextInput source="email" />
<TextInput source="phone" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </TabbedForm.Tab>
            
        </TabbedForm>
    </Edit>
);

export const CustomerCreate = props => (
    <Create {...props}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                <TextInput source="id" disabled />
<TextInput source="name" />
<TextInput source="email" />
<TextInput source="phone" />
<TextInput source="created_at" disabled />
<TextInput source="updated_at" disabled />
            </TabbedForm.Tab>
            
        </TabbedForm>
        
    </Create>
);
