import { View, TouchableWithoutFeedback, Text, Image} from 'react-native';
import { useState, useEffect } from 'react';
import STYLES from '../styles/Styles';


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

export default ChooseCategory = props => {
    <View>
    <Text>Categories</Text>
    <View style = {STYLES.categoryPage}>
         <View  style = {STYLES.categoryGrid} >
             <Image source = {require("../../../assets/category_images/sports.png")}/>
             <Text>Sports</Text>
          </View>

          <View  style = {STYLES.categoryGrid}>
             <Image source = {require("../../../assets/category_images/buy_and_sell.png")}/>  
             <Text>Buy/Sell</Text>
          </View>

         <View  style = {STYLES.categoryGrid}>
             <Image source = {require("../../../assets/category_images/donations.png")}/>
             <Text>Donations</Text>
           </View>

         <View  style = {STYLES.categoryGrid}>
             <Image source = {require("../../../assets/category_images/hobbies.png")}/>
             <Text>Hobbies</Text>
          </View>
          
         </View>
     
</View>
}