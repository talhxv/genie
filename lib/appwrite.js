import {Account, Avatars, Client, Databases, ID} from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.enigma.genie',
    projectId: '6728edba0022b4236a8c',
    databaseId: '6728ef1a002a227b0578',
    userCollectionId: '6728ef3d001f7749014e',
};

const client = new Client();
client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
export const CreateUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error('Account creation failed');
        const avatarURL = avatars.getInitials(username)
        await signIn(email, password);

        // Create the document without avatarURL
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarURL
            }
        );
        return newUser;
    } catch (error) {
        console.log('Error creating user:', error.message);
        throw error;
    }
};

export const signIn = async (email, password) => {
    try {
        const newSession = await account.createEmailPasswordSession(email, password);
        if (!newSession) throw new Error('Session creation failed');
        return newSession;
    } catch (error) {
        console.log('Error signing in:', error.message);
        throw error;
    }
};
