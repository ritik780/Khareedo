
const client = new Appwrite.Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")  // Appwrite API endpoint
  .setProject("691b7ab500093cb35c48");              // Your Appwrite Project I

const databases = new Appwrite.Databases(client);
