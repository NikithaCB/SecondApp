
import React from "react";
import { View, StyleSheet, Image,Text } from "react-native";

// import colors from "../config/colors";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";

function Card({ title, subTitle, imageUrl, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    fontSize:16,
    color: "#a9a9a9",
    fontWeight: "bold",
  },
  title: {
    fontSize:16,
    color:"#000000",
    marginBottom: 7,
  },
});

export default Card;
