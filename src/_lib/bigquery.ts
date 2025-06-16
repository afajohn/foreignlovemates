import { BigQuery } from '@google-cloud/bigquery';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
// Define credentials one by one
const credentials = {
    type: 'service_account',
    project_id: process.env.PROJECT_ID ,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID1 ,
    private_key: process.env.GOOGLE_PRIVATE_KEY1?.replace(/\\n/g, '\n') ,
    client_email: process.env.GOOGLE_CLIENT_EMAIL1,
    client_id: process.env.GOOGLE_CLIENT_ID1 ,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL1 ,
    universe_domain: 'googleapis.com'
};
// Initialize BigQuery
const bigquery = new BigQuery({
    projectId: process.env.PROJECT_ID,
    credentials: credentials
});
export default bigquery;