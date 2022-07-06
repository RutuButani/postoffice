import React, { useState, useEffect } from "react";
import { ImageBackground,KeyboardAvoidingView,ActivityIndicator,StyleSheet,Pressable,Alert, Text,RefreshControl,ScrollView,View, TextInput,Button, FlatList, SafeAreaView } from "react-native";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App({route,navigation}) {
  const {name} = route.params;
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);

 var temp=name.toString();
  const fetchData = async () => {

   var location=name.toString();
     const resp = await fetch("https://api.postalpincode.in/postoffice/"+location);
     const data = await resp.json();
    setData(data[0].PostOffice);
     setLoading(true);
  };

  useEffect(() =>{
     fetchData();
  });
  
  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
    };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

return (
  <SafeAreaView style={styles.container}>
    {Loading? 
     <ImageBackground source={require('../postoffice/img/bg.jpeg')} resizeMode="cover" style={styles.DetailImgBg} imageStyle={{opacity:0.7}}>
    <FlatList
      data={data}
      renderItem={({item}) =>
      <Pressable style={styles.MoreDetail1} onPress={() =>navigation.navigate('HomeScreen1',{Data:item})}>
                 <Text style={styles.txt1}>{item.Name}</Text>
                 <Text style={styles.txt1}>{item.Pincode}</Text>

      </Pressable>}
      keyExtractor={(item) => item.id}
           
            ListHeaderComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
                List of Locations
              </Text>
            )}
            ListFooterComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Thank You</Text>
      )}
    />
    </ImageBackground>:
    <ImageBackground source={require('../postoffice/img/bg.jpeg')} resizeMode="cover" style={styles.DetailImgBg} imageStyle={{opacity:0.7}}>
    <View style={styles.main}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.innertext}>Loading your data.....</Text>
    </View>
    </ImageBackground>
    }
  </SafeAreaView>
  );
};

function HomeScreen({navigation}) {
const [Location, setLocation] = useState(" ");
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}

      style={styles.container}
    >
   <ImageBackground source={require('../postoffice/img/bg.jpeg')} resizeMode="cover" style={styles.DetailImgBg} imageStyle={{opacity:0.7}}>
    <View style={styles.main}>
              <TextInput  style={styles.input}
                                 placeholder="Enter name of Location"
                                 placeholderTextColor="#000"
                                 onChangeText={(item) => setLocation(item)}></TextInput>
            <Pressable style={styles.moreDetailBackButton1}  
                         onPress={() =>{navigation.navigate('App',{name:Location})}}>
                          <Text style={styles.moreDetailBtnTxt}>DATA</Text>
            </Pressable>
    </View>
    </ImageBackground>
  </KeyboardAvoidingView>

  );
}


function HomeScreen1({route,navigation}) {
const {Data} = route.params;
  return (
    <ImageBackground source={require('../postoffice/img/bg.jpeg')} resizeMode="cover" style={styles.DetailImgBg} imageStyle={{opacity:0.7}}>
        <View style={styles.MoreDetail}>
          <Text style={styles.moreDetailtxt}>Name: {Data.Name}</Text>
          <Text style={styles.moreDetailtxt}>Region: {Data.Region}</Text>
          <Text style={styles.moreDetailtxt}>State: {Data.State}</Text>
          <Text style={styles.moreDetailtxt}>Country: {Data.Country}</Text>
          <Text style={styles.moreDetailtxt}>Pincode: {Data.Pincode}</Text>
          <Pressable style={styles.moreDetailBackButton} onPress={()=>navigation.goBack()}><Text style={styles.moreDetailBtnTxt}>Close</Text></Pressable>
        </View>
      </ImageBackground>
  );
}
const Stack = createNativeStackNavigator();

function App1() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
         <Stack.Screen name="HomeScreen" component={HomeScreen} />
         <Stack.Screen name="App" component={App}/>
         <Stack.Screen name="HomeScreen1" component={HomeScreen1}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

input:{
borderWidth:1,
borderColor:"black",
borderRadius:20,
height:60,
width:"95%",
fontSize:20,

},
txt1:{
fontSize:20,
color:'#0F6F6E',
padding:"1%",
},
main:{
marginTop:"70%",
alignItems:"center",
},
innertext:{
marginTop:20,
fontWeight:"400",
},
   DetailImgBg:{
      height:800,
      width:"100%",
    },
  item: {
    backgroundColor: '#ff6c37',
    borderWidth:2,
    borderRadius:20,
    borderColor:"#05246c",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color:"black"
  },
  MoreDetail: {
        elevation: 25,
        backgroundColor:"#EFF8F8",
        borderWidth: 5,
        borderColor: "#269C9B",
        borderRadius: 10,
        margin: "38%",
        margin:"6%",
        alignItems: 'center',
        justifyContent: 'center'
      },
       MoreDetail1: {
        elevation: 25,
        backgroundColor:"#EFF8F8",
        borderWidth: 3,
        borderColor: "#269C9B",
        borderRadius: 20,
        margin: "6%",
        alignItems: 'center',
        justifyContent: 'center'
      },
      moreDetailtxt: {
      fontSize:28,
      padding:"2.5%",
      color: '#0F6F6E'
      },
      moreDetailBackButton: {
        backgroundColor:"#269C9B",
        width:"100%",
        alignItems:'center',
        marginTop:"2%",
      },
      moreDetailBackButton1: {
              backgroundColor:"#269C9B",
              width:"60%",
              alignItems:'center',
              marginTop:"2%",
              borderRadius:20,
      },
      moreDetailBtnTxt: {
        fontSize:18,
        fontWeight: 'bold',
        padding:"2.5%",
        color: 'white'
      },
});

export default App1;