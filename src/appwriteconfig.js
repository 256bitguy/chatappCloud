import {Client,Databases,Account} from 'appwrite'

export const PROJECT_ID='65dfe0638ef7c1e37be1'
export const DATABASE_ID='65dfe29e6f7a7a78de8d'
export const COLLECTION_ID_MESSSAGE='65dfe2a90b1a20964db8'
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65dfe0638ef7c1e37be1');

 export  const databases=new Databases(client); 
export const account =new Account(client);
export default client;