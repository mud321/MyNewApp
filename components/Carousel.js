import {View,Image,StyleSheet, ScrollView,Pressable}from 'react-native';
import React from 'react';

const Carousel=()=>{
    const Carousel = [
        {
          id: "0",
          image: "https://magnetoitsolutions.com/wp-content/uploads/2020/05/Complete-Guide-for-Building-On-demand-Laundry-App-And-Necessary-Features.jpg",
          name: "Washing",
         
        },
        {
          id: "11",
          image: "https://externlabs.com/blogs/wp-content/uploads/2022/01/laundry-app.png",
          name: "Laundry"
        },
        {
          id: "12",
          image: "https://tse1.mm.bing.net/th?id=OIP.vC1O8AIuC-eYCQbRiYusBQHaEK&pid=Api&P=0&h=220",
          name: "Wash & Iron",
         
        },

      ];
    return(
        <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Carousel.map((service,index) => (
                <Pressable style={{padding:8,borderRadius:7}} key={index}>
                    <Image source={{uri:service.image}} style={{width:400,height:200}}/>

          
                </Pressable>
            ))}
        </ScrollView>
        </View>
    )
}
export default Carousel;
const styles=StyleSheet.create({

})