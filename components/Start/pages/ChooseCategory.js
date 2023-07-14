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
    <View styles = {STYLES.page}>
           <Text>Categories</Text>
                <View>
                    <Text>Sports</Text>
                    <Image source = {require("../../../assets/category_images/sports.png")}/>
                    </View>

                
               
                <View>
                    <Text>Buy/Sell</Text>
                    <Image source = {require("../../../assets/category_images/buy_and_sell.png")}/>

                    
                </View>
                <View>
                    <Text>Donations</Text>
                    <Image source = {require("../../../assets/category_images/donations.png")}/>

                   
                </View>
                <View>
                    <Text>Hobbies</Text>
                    <Image source = {require("../../../assets/category_images/hobbies.png")}/>

                   
                </View>
            
    </View>
}