import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import Skeleton from '../../components/Skeleton'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../lib/appwrite'


const Home = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await getAllPosts();

        setData(response);
        console.log(data)
      } catch (err) {
        Alert.alert('Error', err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();
  }, [])

  const [refreshing, setRefreshing] = useState(false)
 
  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[{id: 1}]}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                KB
                </Text>
              </View>
              <View className="mt-1 5">
                <Image 
                  src={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />
            <View className='w-fuill flex-1 pt-5 pb-8'>
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending 
                posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}
              />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <Skeleton 
            title="No Videos Found"
            subtitle="Be the first one to ui"
          />
        )}
        refereshControl={<RefreshControl refrehing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home