import * as React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator} from  'react-native'; //ActivityIndicator는 앱이 시작되거나 작업이 지속되는 등의 동작이 나타날 때, 내부적으로 그것을 표시하는 로딩 배너 등을 띄울 때 사용하게 된다.
import Constants from 'expo-constants';
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const URL = `https://api.openweathermap.org/data/2.5/weather?q=SEOUL&appid=9bd8f996e77c6633d856a52ddb852c99&units=Metric`; 
const URL2 = `https://v2.jokeapi.dev/joke/Any?type=single`;

export default function App() {
  const [isReady, setReady] = React.useState(false); // 변화시킨다.
  const [data, setData] = React.useState([]);
  const [humor, setHumor] = React.useState([]);

  React.useEffect(()=>{
    const timer = setTimeout(async()=>{
      try{ // 이부분 고민해보기
        const res = await fetch(URL); // fetch로 가져오겠다. await: 기다리겠다.
        const json = await res.json();
        setData(json);
        console.log(json);
        const res2 = await fetch(URL2);
        const json2 = await res2.json();
        setHumor(json2);
        console.log(json2);
      }
      catch(err){
        console.error(err);
      }
      finally{
        console.log("finally");
        setReady(true);
      }
    },0);
    return ()=>{
      clearTimeout(timer);
    }
  },[]);
     if(!isReady){
    return (
      <View style={{flex:1,justifyContent:"center",backgroundColor:"#222222"}}>
        <ActivityIndicator size={40} color="#FFF" />
      </View>
    )
   }

  return (
    // <Text style={styles.paragraph}>{data.name}</Text> 
    // = Json 값을 받아온다.
    <View style = {styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/tokyo.png')}
      >
      </Image>
      <Text style={styles.paragraph}>{data.name}</Text> 
      <Text style={styles.celcius}>celcius</Text>
      <View style ={styles.row}>
        <Text style={styles.min}>{data.main.temp_min}</Text>
        <Text style={styles.middle}>{data.main.temp}</Text>
        <Text style={styles.max}>{data.main.temp_max}</Text>
      </View>
       <Text style={styles.humor}>Today Humor</Text>
       <View style={styles.box}>
        <Text style={styles.humortext}>{humor.joke}}</Text>
      </View>
    </View>
  );
}
// []는 순서가 중요하고
// {}는 순서가 필요없다.
const styles = StyleSheet.create({
  container: {
    flex: 1, // 보이는 화면을 여백없이 채우겠다.
    // justifyContent: 'center', 
    paddingTop: 50,
    backgroundColor: '#222222',
  },
  paragraph: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    color:'#988787',
    textAlign: 'center', // Text에서만 textAlign을 사용. 나머지는 alignSelf사용
  },
    tinyLogo: {
    width: 150,
    height: 150,
    alignSelf:"center", //나 자신을 가운데로 정렬
  },

  celcius: {
    marginTop: 24,
    fontSize: 30,
    fontWeight: 'bold',
    color:'#40C3ED',
    textAlign: 'center', 
  },
  row : {
    flexDirection:"row",
    justifyContent:"center", // 가운데 정렬
    alignItems:"center", // row에 있는 것들이 다 정렬
  },
  min: {
    fontSize: 15,
    color:"#B1B1B1",
    marginLeft:30,
    marginRight:30,  
  },
    middle: {
    fontSize: 40,
    fontWeight: 'bold',
    color:'#40C3ED',
  },
    max: {
    fontSize: 15,
    color:'#B1B1B1',
    marginLeft:30,
    marginRight:30,
  },
    humor: {
    marginTop : 24,
    fontSize: 20,
    fontWeight: 'bold',
    color:'#40C3ED',
    textAlign: 'center'
  },
  box: {
    marginTop : 20,
    marginLeft : 40,
    marginRight : 40,
    padding : 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor:'#484848',
    textAlign: 'center',
    borderRadius: 10,
  },
   humortext: {
    fontSize: 15,
    color:'#FFF',
  },
});