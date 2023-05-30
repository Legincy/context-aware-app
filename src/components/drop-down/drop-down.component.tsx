import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export interface IDropDownItem {
    label: string;
    value: string;
}

export interface IDropDown {
    items: IDropDownItem[];
    setValue?: (value: string) => void;
}

const DropDown = ({ items, setValue }: IDropDown) => {
    const [open, setOpen] = useState(false);
    const [value, setValueInternal] = useState<string>('');
    const [childItems, setChildItems] = useState<IDropDownItem[]>(items);

    useEffect(() => {
        if (value === null || value === '') return;
        setValue && setValue(value);
    }, [value]);

    return (
        <View style={styles.dropDownWrapper}>
            <DropDownPicker
                open={open}
                value={value}
                items={childItems}
                setOpen={setOpen}
                setValue={setValueInternal}
                setItems={setChildItems}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropDownWrapper: {
        zIndex: 2000,
    },
});

export default DropDown;
