import { View, TouchableWithoutFeedback, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import STYLES from "../styles/Styles";

// const ViewInterests = props => {

//     const [CategoryList, setCategoryList] = useState ([])

//    useEffect(()=> {
//     fetch('https://console.firebase.google.com/project/places-e6047/firestore/data/~2Finterests')
//     .then(res =>{
//         return res.json()})
//     .then(res =>{
//         setInterestList(res.results)
//     })
//     .catch(err =>{console.log(err)})
// }, [])

// }

export default Google = (props) => {
  return (
    <View style={STYLES.categoryFullPage}>
      <Text style={{ fontWeight: "bold" }}>Categories</Text>
      <View style={STYLES.categoryPage}>
        <View style={STYLES.categoryGrid}>
          <Image
            source={require("../../../assets/category_images/sports.png")}
          />
          <Text style={STYLES.category}>Sports</Text>
        </View>

        <View style={STYLES.categoryGrid}>
          <Image
            source={require("../../../assets/category_images/buy_and_sell.png")}
          />
          <Text style={STYLES.category}>Buy</Text>
        </View>

        <View style={STYLES.categoryGrid}>
          <Image
            source={require("../../../assets/category_images/donations.png")}
          />
          <Text style={STYLES.category}>Donations</Text>
        </View>

        <View style={STYLES.categoryGrid}>
          <Image
            source={require("../../../assets/category_images/hobbies.png")}
          />
          <Text style={STYLES.category}>Hobbies</Text>
        </View>
      </View>
    </View>
  );
};
