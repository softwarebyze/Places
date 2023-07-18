import { View, Text, Image, TextInput} from 'react-native';
import STYLES from '../styles/Styles';



export default AddInterest = (props) => {

    return(
        <View style = {STYLES.interestPage}>
            <View style ={STYLES.interestGrid}>
                <TextInput placeholder = 'search'
                style = {STYLES.searchbar}/>
            </View>
            <View>
                <View style = {STYLES.interestList}>
                    <Image source = {require("../../../assets/interest_images/football.png")}/>
                    <Text>American Football/New York City</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}/>

                </View>
                <View style = {STYLES.interestList}>
                    {/* <Image source = {require("../../../assets/interest_images/baseball.png")}/> */}
                    <Text>Baseball/New York City</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}/>

                </View>
                <View style = {STYLES.interestList}>
                    <Image source = {require("../../../assets/interest_images/basketball.png")}/>
                    <Text>Basketball/New York City</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}/>

                </View>
                <View style = {STYLES.interestList}>
                    <Image source = {require("../../../assets/interest_images/boxing.png")}/>
                    <Text>Boxing/New York City</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}/>

                </View>
                <View style = {STYLES.interestList}>
                    <Image source = {require("../../../assets/interest_images/climbing.png")}/>
                    <Text>Climbing/New York City</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}/>

                </View>
                <View style = {STYLES.interestList}>
                    <Image source = {require("../../../assets/interest_images/cycling.png")}/>
                    <Text>Cycling/New York City</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}/>

                </View>
                <View style = {STYLES.interestList}>
                    <Image source = {require("../../../assets/interest_images/golf.png")}/>
                    <Text>Golf/New Yoty</Text>
                    <Image source = {require("../../../assets/interest_images/arrow.png")}
                           style = {STYLES.interestArrow}/>
                </View>
            </View>
        </View>
    )






};