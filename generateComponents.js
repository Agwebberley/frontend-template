const fs = require('fs');
const path = require('path');

const resources = [
    // Define your resources here
    {
        name: 'customer',
        fields: [
            { name: 'id', type: 'number', editable: false },
            { name: 'name', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'phone', type: 'string' },
            { name: 'created_at', type: 'date', editable: false },
            { name: 'updated_at', type: 'date', editable: false }
        ]
    },
    {
        name: 'part',
        fields: [
            { name: 'id', type: 'number', editable: false },
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'price', type: 'number' },
            { name: 'stock_quantity', type: 'number' },
            { name: 'created_at', type: 'date', editable: false },
            { name: 'updated_at', type: 'date', editable: false }
        ]
    },
    {
        name: 'order',
        fields: [
            { name: 'id', type: 'number', editable: false },
            { name: 'customer_id', type: 'reference', reference: 'customer' },
            { name: 'order_date', type: 'date' },
            { name: 'total_amount', type: 'number' },
            { name: 'status', type: 'string' },
            { name: 'created_at', type: 'date', editable: false },
            { name: 'updated_at', type: 'date', editable: false }
        ],
        nested: [
            {
                name: 'order_item',
                fields: [
                    { name: 'id', type: 'number', editable: false },
                    { name: 'order_id', type: 'reference', reference: 'order' },
                    { name: 'part_id', type: 'reference', reference: 'part' },
                    { name: 'quantity', type: 'number' },
                    { name: 'unit_price', type: 'number' },
                    { name: 'created_at', type: 'date', editable: false },
                    { name: 'updated_at', type: 'date', editable: false }
                ]
            }
        ]
    },
];

const generateFormField = (field) => {
    if (field.type === 'reference') {
        return `
        <ReferenceInput source="${field.name}" reference="${field.reference}">
            <SelectInput optionText="id" />
        </ReferenceInput>`;
    }
    if (field.editable === false) {
        return `<TextInput source="${field.name}" disabled />`;
    }
    return field.type === 'number'
        ? `<NumberInput source="${field.name}" />`
        : `<TextInput source="${field.name}" />`;
};

const generateNestedFormField = (nested) => {
    return `
    <ArrayInput source="${nested.name}">
        <SimpleFormIterator>
            ${nested.fields.map(generateFormField).join('\n')}
        </SimpleFormIterator>
    </ArrayInput>`;
};

const componentTemplate = (resource, fields, nested) => `
import * as React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, NumberInput, DateInput, Create, TabbedForm, FormTab, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const ${resource}List = props => (
    <List {...props}>
        <Datagrid>
            ${fields.map(field => {
                if (field.type === 'reference') {
                    return `<TextField source="${field.name}" reference="${field.reference}" />`;
                }
                return `<TextField source="${field.name}" />`;
            }).join('\n')}
            <EditButton basePath="/${resource.toLowerCase()}" />
            <DeleteButton basePath="/${resource.toLowerCase()}" />
        </Datagrid>
    </List>
);

export const ${resource}Edit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Details">
                ${fields.map(generateFormField).join('\n')}
            </FormTab>
            ${nested ? nested.map(generateNestedFormField).join('\n') : ''}
        </TabbedForm>
    </Edit>
);

export const ${resource}Create = props => (
    <Create {...props}>
        <SimpleForm>
            ${fields.map(generateFormField).join('\n')}
            ${nested ? nested.map(generateNestedFormField).join('\n') : ''}
        </SimpleForm>
    </Create>
);
`;

resources.forEach(({ name, fields, nested }) => {
    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    const componentContent = componentTemplate(componentName, fields, nested);

    const componentDir = path.join('src', 'components');
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
    }

    fs.writeFileSync(path.join(componentDir, `${name}.js`), componentContent);
});

console.log('Components generated successfully.');
