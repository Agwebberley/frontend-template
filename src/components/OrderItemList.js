import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { SimpleFormIterator, ArrayInput, TextInput } from 'react-admin';

const OrderItemList = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'order_items'
    });

    return (
        <ArrayInput source="order_items">
            <SimpleFormIterator>
                <TextInput source="product" label="Product" />
                <TextInput source="quantity" label="Quantity" />
                <TextInput source="price" label="Price" />
            </SimpleFormIterator>
        </ArrayInput>
    );
};

export default OrderItemList;
