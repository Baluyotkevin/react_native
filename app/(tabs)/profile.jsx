import { useEffect } from "react";
import { router } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUsersPosts, searchPosts, signOut } from "../../lib/appwrite";
import { SearchInput, Skeleton, VideoCard, InfoBox } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider"
import { icons } from "../../constants";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUsersPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLogged(false)
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image 
                source={icons.logout}
                resizeMode="contain"
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image 
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox title={user?.username} containerStyles='mt-5' titleStyles="text-lg" />

            <View className="mt-5 flex-row">
              <InfoBox title={posts.length || 0} subtitle='Posts' containerStyles='mr-10' titleStyles="text-xl" />
              <InfoBox title="1.5k" subtitles="Followers" titleStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Skeleton
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;