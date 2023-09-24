import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardContainer from './CardContainer';
import Navbar from './Navbar';
import database from '@react-native-firebase/database';
import {LineChart} from 'react-native-chart-kit';

const UpperView = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const databaseRef = database().ref('/');

    const onDataChange = snapshot => {
      setData(snapshot.val());
    };

    const onError = error => {
      console.error('Error fetching data: ', error);
    };

    databaseRef.on('value', onDataChange, onError);

    return () => {
      databaseRef.off('value', onDataChange);
    };
  }, []);

  const chartConfig = {
    color: (opacity = 1) => `rgb(0,0,0), ${opacity})`,
    strokeWidth: 2,
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
  };

  return (
    <View style={styles.upperView}>
      <Navbar />
      {data && (
        <View style={styles.cardView}>
          <CardContainer title={'Temperature'} data={data?.Temperature} />
          <CardContainer title={'Humidity'} data={data?.Humidity} />
        </View>
      )}
      {data && (
        <>
          <LineChart
            style={styles.graphStyle}
            data={{
              labels: Object.entries(data.Temperature)
                .map(([timestamp, value]) => ({
                  x: timestamp,
                  y: value,
                }))
                .slice(0, 5)
                .map(dataPoint => dataPoint.x.slice(11)),
              datasets: [
                {
                  data: Object.entries(data.Temperature)
                    .map(([timestamp, value]) => ({
                      x: timestamp,
                      y: value,
                    }))
                    .slice(0, 5)
                    .map(dataPoint => dataPoint.y),
                },
              ],
            }}
            width={Dimensions.get('window').width - 10}
            height={220}
            chartConfig={chartConfig}
          />
        </>
      )}
    </View>
  );
};

export default UpperView;

const styles = StyleSheet.create({
  upperView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardView: {
    marginVertical: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  graphStyle: {
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginVertical: 30,
  },
});
