import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Pressable, Button } from 'react-native';
import { NumericInput } from './NumericInput';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VictoryPie } from 'victory-native';

const config = {
 fontSize: 18,
}

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [values, setState] = React.useState({
    currentAge: "32",
    retirementAge: "65",
    currentRetirementFunds: "100000",
    monthlySavings: "500",
    retirementIncome: "5000",
  });

  function cleanInteger(value, min, max) {
    let intValue = parseInt(value);
    if(isNaN(intValue)) return value;

    let result = value;
    // Remove leading zero
    if( intValue === 0) result = '0';
    else result = value.replace(/\b0+/g, '');

    // If the integer is out of bound, set it to min or max
    if(intValue > max) result = String(max);
    else if (intValue < min) result = String(min);

    return result;
  }

  // Called when the text input has changed
  const onChangeCurrentAge = (value) => {
    setState({
      ...values,
      currentAge: cleanInteger(value, 0, 100),
    });
  }

  const onChangeRetirementAge = (value) => {
    setState({
      ...values,
      retirementAge: cleanInteger(value, 0, 100),
    });
  }

  const onChangeCurrentRetirementFunds = (value) => {
    setState({
      ...values,
      currentRetirementFunds: cleanInteger(value, 0, 3000000),
    });
  }
  
  const onChangeMonthlySavings = (value) => {
    setState({
      ...values,
      monthlySavings: cleanInteger(value, 0, 20000),
    });
  }
  
  const onChangeRetirementIncome = (value) => {
    setState({
      ...values,
      retirementIncome: cleanInteger(value, 0, 40000),
    });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, { justifyContent: 'center', }]}>
        <Text style={{
          fontSize: config.fontSize * 1.6,
        }}>
          RetirementPortfolio.org
        </Text>
      </View>
      <View style={styles.row}>
        <NumericInput
          label="Current Age"
          mask="999"
          onChangeText={ onChangeCurrentAge }
          value={values.currentAge}
        />
        <NumericInput
          label="Retirement Age"
          mask="999"
          onChangeText={ onChangeRetirementAge }
          value={values.retirementAge}
        />
      </View>
      <View style={styles.row}>
        <NumericInput
          label="Current Retirement Funds"
          mask="9999999"
          onChangeText={ onChangeCurrentRetirementFunds }
          value={values.currentRetirementFunds}
        />
      </View>
      <View style={styles.row}>
        <NumericInput
          label="Monthly Savings"
          mask="99999"
          onChangeText={ onChangeMonthlySavings }
          value={values.monthlySavings}
        />
      </View>
      <View style={styles.row}>
        <NumericInput
          label="Desired Monthly Retirement Income"
          mask="99999"
          onChangeText={ onChangeRetirementIncome }
          value={values.retirementIncome}
        />
      </View>
      <View style={[styles.buttonContainer, styles.buttonContainerPrimary]}>
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.navigate('Result', values)}
        >
          <Text style={[styles.buttonLabel, styles.buttonLabelPrimary]}>Calculate</Text>
        </Pressable>
      </View>
      <View style={[styles.buttonContainer, styles.buttonContainerSecondary]}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={[styles.buttonLabel, styles.buttonLabelSecondary]}>Reset</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Text style={{
          fontSize: config.fontSize  / 1.8,
        }}>The information provided by the Portfolio Modeling Tool is for educational purposes only and is not intended as specific investment advice for you. Fund expense ratios last updated on 4/5/2018.
© 2023, EISRC and RetirementPortfolio.org, All Rights Reserved
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function ResultScreen({ route, navigation }) {
  const { currentAge,
    retirementAge,
    currentRetirementFunds,
    monthlySavings,
    retirementIncome, } = route.params;

    console.log('result ', retirementIncome);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Result Screen</Text>
      <VictoryPie
        innerRadius="90"
        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
        data={[
          { x: "a", y: 35 },
          { x: "b", y: 10 },
          { x: "c", y: 55 },
          { x: "d", y: 5 },
          { x: "e", y: 55 },
        ]}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Start' }}/>
        <Stack.Screen name="Result" component={ResultScreen}  options={{ title: 'Result' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
    // height: 50,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    marginTop: 15,
    // flexWrap: "wrap",
  },
  buttonContainer: {
    // width: 320,
    height: 60,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginTop: 15,
    borderRadius: 8,
  },
  buttonContainerPrimary: {
    backgroundColor: '#28a745',
  },
  buttonContainerSecondary: {
    backgroundColor: '#6c757d',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabelPrimary: {
    color: '#fff',
    fontSize: 24,
  },
  buttonLabelSecondary: {
    color: '#fff',
    fontSize: 24,
  },
});
