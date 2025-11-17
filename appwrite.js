
// Appwrite Initialization

const client = new Appwrite.Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")   // Appwrite endpoint
    .setProject("691b7ab500093cb35c48");              

const databases = new Appwrite.Databases(client);
// Save Cart to Database
async function saveCartToDB(cart) {
    try {
        const userId = localStorage.getItem("id_token"); 
        const result = await databases.createDocument(
            "691b7aec003c0cfc9c2f",     // Replace
            "carts",   // Replace
            userId,                 // Document ID = user token
            {
                cart: cart,
                updatedAt: new Date().toISOString()
            }
        );

        console.log("CART SAVED SUCCESSFULLY:", result);
    }
    catch (err) {
        console.error("SAVE CART ERROR:", err);
    }
}
