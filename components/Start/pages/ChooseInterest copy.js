import { View, Pressable, Text} from 'react-native';
import { useState, useEffect } from 'react';
import STYLES from '../styles/Styles';


const SubCategories = props => {

    const [InterestList, setInterestList] = useState ([])

    useEffect (() =>{
        fetch('https://console.firebase.google.com/project/places-e6047/firestore/data/~2Finterests')
            .then(res =>{
                return res.json()})
            .then(res =>{
                setInterestList(res.results)
            })
            .catch(err =>{console.log(err)})
    }, [])
}



export default ChooseInterest = props => {
    <View>
        {InterestList.map((interest, index => 
            <Pressable key = {index}>
                <Text>{interest.name}</Text>
            </Pressable>))}
    </View>
}