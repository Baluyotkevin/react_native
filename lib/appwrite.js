import { Client, Account } from "react-native-appwrite";

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
// const avatars = new Avatars(client);
// const databases = new Databases(client);

// Register User

export const newUser = () => {
    account.create(ID.unique(), 'me@exanple.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response)
    }, function (error) {
        console.log(error)
    })

}