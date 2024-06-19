const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Load the YAML file
const file = fs.readFileSync('resources.yaml', 'utf8');
const { resources } = yaml.parse(file);

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
    if (field.type === 'date') { return `<DateInput source="${field.name}" />` }
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
import { Show, SimpleShowLayout, ShowButton, ReferenceField, NumberField, ArrayField, DateField } from 'react-admin';

export const ${resource}List = props => (
    <List {...props}>
        <Datagrid>
            ${fields.map(field => {
                if (field.type === 'reference') {
                    return `<TextField source="${field.name}" reference="${field.reference}" />`;
                }
                return `<TextField source="${field.name}" />`;
            }).join('\n')}
            <EditButton />
            <DeleteButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const ${resource}Show = props => (
    <Show {...props}>
        <SimpleShowLayout>
            ${fields.map(field => {
                if (field.type === 'reference') {
                    return `<ReferenceField source="${field.name}" reference="${field.reference}">
                        <TextField source="id" />
                    </ReferenceField>`;
                }
                return `<TextField source="${field.name}" />`;
            }
            ).join('\n')}
            ${nested ? nested.map(nestedItem => `
            <h3>${nestedItem.name}</h3>
            <ArrayField source="${nestedItem.name}">
                <Datagrid>
                    ${nestedItem.fields.map(field => {
                        if (field.type === 'reference') {
                            return `<ReferenceField source="${field.name}" reference="${field.reference}">
                                <TextField source="id" />
                            </ReferenceField>`;
                        }
                        return `<TextField source="${field.name}" />`;
                    }
                    ).join('\n')}
                </Datagrid>
            </ArrayField>`).join('\n') : ''}
        </SimpleShowLayout>
    </Show>
);

export const ${resource}Edit = props => (
    <Edit {...props}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                ${fields.map(generateFormField).join('\n')}
            </TabbedForm.Tab>
            ${nested ? nested.map(nestedItem => `<TabbedForm.Tab label="${nestedItem.name}">${generateNestedFormField(nestedItem)}</TabbedForm.Tab>`).join('\n') : ''}
        </TabbedForm>
    </Edit>
);

export const ${resource}Create = props => (
    <Create {...props}>
        <TabbedForm>
            <TabbedForm.Tab label="Details">
                ${fields.map(generateFormField).join('\n')}
            </TabbedForm.Tab>
            ${nested ? nested.map(generateNestedFormField).join('\n') : ''}
        </TabbedForm>
        ${nested ? nested.map(nestedItem => `<TabbedForm.Tab label="${nestedItem.name}">${generateNestedFormField(nestedItem)}</TabbedForm.Tab>`).join('\n') : ''}
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
