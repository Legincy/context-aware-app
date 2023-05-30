import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = { label: string; value: boolean; onChange: (status: boolean) => void };

export const CheckBox = (props: Props) => {
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.section}>
            <Checkbox
                style={styles.checkbox}
                value={props.value}
                onValueChange={(status) => props.onChange(status)}
            />
            <Text style={styles.paragraph}>{props.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        color: '#BEBEBE',
        fontSize: 13,
        fontWeight: '400',
    },
    checkbox: {
        margin: 8,
    },
});

export default CheckBox;
