import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import CarouselItem from "./CarouselItem";
import { Avatar } from "react-native-elements";

const { width, heigth } = Dimensions.get("window");
let flatList;
const boxItems = [
  { icon: require("../../assets/images/_car.png"), qty: 2, bWidth: 0 },
  { icon: require("../../assets/images/_bath.png"), qty: 6, bWidth: 1 },
  { icon: require("../../assets/images/_bed.png"), qty: 4, bWidth: 0 },
];
let timeout = 0;

function infiniteScroll(dataList) {
  const numberOfData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  timeout = setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }

    // this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
  }, 3000);
}

const Carousel = ({ data, navigation }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    setDataList(data);
    infiniteScroll(dataList);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          // ref={(flatList) => {
          //   this.flatList = flatList;
          // }}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <CarouselItem
                item={item}
                index={index}
                total={data.length}
                navigation={navigation}
              />
            );
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />

        {/* Bottom dot view */}
        {/* <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View> */}
        <View style={styles.container}>
          {boxItems.map((item, i) => (
            <View
              style={{
                flex: 2,
                borderTopWidth: 1,
                borderTopColor: "#eaeaea",
                borderLeftColor: "#eaeaea",
                borderRightColor: "#eaeaea",
                borderLeftWidth: item.bWidth,
                borderRightWidth: item.bWidth,
              }}
              key={i}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: 6,
                }}
              >
                <Avatar
                  size={15}
                  title="BP"
                  source={item.icon}
                />
                <Text style={{ textAlign: "center" }}>{item.qty}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  console.log("Please provide Images");
  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
  container: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    flexDirection: "row",
    margin: 5,
  },
});

export default Carousel;
