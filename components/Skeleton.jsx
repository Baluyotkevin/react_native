import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const Skeleton = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
        src={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode='contain'
        />

        <Text className="font-pmedium text-sm text-gray-100">
            {title}
        </Text>
        <Text className="text-2xl font-psemibold texxt-white">
            {subtitle}
        </Text>

        <CustomButton 
            title="Create Video"
            handlePress={() => router.push('create')}
            containerStyles="w-full my-5"
        />
    </View>
  )
}

export default Skeleton