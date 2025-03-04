import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function CustomText(props) {
  return (
   <Text style={styles.textStyle}>{props.title}</Text>
  )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:15
    }
})
