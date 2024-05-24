import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.kb.aora",
    projectId: "662ae83d707d8bb8b21a",
    databaseId: "662ae938607dc6c48a2f",
    userCollectionId: "662ae94f5e4481e1690e",
    videoCollectionId: "662ae96539e7a7b87c15",
    storageId: "662aea66768afa1bd38b",
}
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }

}

export const signIn = async (email, password) => {
    try {

        const session = await account.createEmailSession(email, password)

        return session;

    } catch (err) {
        throw new Error(err)
    }
}

export const getCurrentUser = async () => {
    try {

        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (err) {
        console.log(err)
    }
}

export const getAllPosts = async () => {
    try {

        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )

    } catch (err) {
        throw new Error(err)
    }
}