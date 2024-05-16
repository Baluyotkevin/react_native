import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending =  ({ posts }) => {
  return (
    <FlatList
        data={posts}
        keyExtractor={({item}) => (
            <Text className="">
            
            </Text>
        )}
    />
  )
}

export default Trending