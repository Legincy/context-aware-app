import { StyleSheet, Text, View } from 'react-native';
import colorMapConfig from './config/color-map.config';

export interface ColoredBoxData {
    label: string;
    value: string | number | null;
}

type Props = {
    data?: ColoredBoxData[];
};

export const ColoredDataBox = ({ data }: Props) => {
    let colorIndex = 0;

    const coloredBoxes = data?.map((boxData: ColoredBoxData, index: number) => {
        return (
            <View
                style={{
                    ...styles.dataBox,
                    ...{
                        backgroundColor:
                            data.length > 1 ? colorMapConfig[colorIndex++].hex : '#343a40',
                    },
                }}
                key={index}
            >
                <Text style={styles.boxTitleText}>{boxData.label}</Text>
                <Text style={styles.boxValueText}>
                    {boxData.value ? Number(boxData.value).toFixed(2) : '---'}
                </Text>
            </View>
        );
    });

    return <View style={styles.componentContainer}>{coloredBoxes}</View>;
};

const styles = StyleSheet.create({
    componentContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 80,
        gap: 8,
    },
    dataBox: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        height: '100%',
        backgroundColor: 'gray',
        borderRadius: 16,
        color: 'white',
        padding: 8,
    },
    boxTitleText: { color: 'white', fontWeight: '500', fontSize: 16, opacity: 0.5 },
    boxValueText: { color: 'white', fontWeight: '200', fontSize: 28, marginLeft: 'auto' },
});

export default ColoredDataBox;
