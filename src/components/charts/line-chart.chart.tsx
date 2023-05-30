import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import colorMapConfig from '../../features/sensor/components/colored-data-box/config/color-map.config';

type NativeLayoutEvent = {
    layout: {
        width: number;
        height: number;
    };
};

export const LineChartTile = () => {
    const [chartWrapperDimensions, setChartWrapperDimensions] = useState<{
        width: number;
        height: number;
    }>({ width: 0, height: 0 });

    const updateWrapperDimensions = (nativeEvent: NativeLayoutEvent) => {
        nativeEvent.layout.width;
        setChartWrapperDimensions({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height,
        });
    };

    useEffect(() => {
        console.log(chartWrapperDimensions);
    }, [chartWrapperDimensions]);

    return (
        <View
            style={styles.container}
            onLayout={({ nativeEvent }) => {
                updateWrapperDimensions(nativeEvent);
            }}
        >
            <LineChart
                width={chartWrapperDimensions.width}
                height={chartWrapperDimensions.height}
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: [], // Daten für die x-Achse
                            color: (opacity = 1) => colorMapConfig[0].hex, // Farbe für den Datensatz
                        },
                        {
                            data: [], // Daten für die x-Achse
                            color: (opacity = 1) => colorMapConfig[1].hex, // Farbe für den Datensatz
                        },
                        {
                            data: [], // Daten für die x-Achse
                            color: (opacity = 1) => colorMapConfig[2].hex, // Farbe für den Datensatz
                        },
                    ],
                }}
                chartConfig={{
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 0, // number of decimal places for Y-axis labels
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { ...styles.chart },
                }}
                bezier
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 32,
        borderRadius: 16,
        backgroundColor: 'white',
    },
    chart: {},
});

export default LineChartTile;
