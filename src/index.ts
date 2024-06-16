import express, { application } from "express"
import session from "express-session";
import { createServer } from "http"
import MSSQLStore from 'connect-mssql-v2';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "rds!db-524f1338-efac-44ef-a434-d08e6dc5e0cf";

const client = new SecretsManagerClient({
    region: "ap-southeast-1",
});



let getSecret = function (): Promise<any> {
    try {
        return client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );
    } catch (error) {
        throw error;
    }
}



const config = {
    user: '...',
    password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: '...',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true, // use this if your MS SQL instance uses a self signed certificate
    },
};

const expressApp = express()
const httpServer = createServer(expressApp)

const port = 80 || process.env.PORT

expressApp.set('view engine', 'ejs')

expressApp.use(
    session({
        store: new MSSQLStore(config), // options are optional
        secret: 'supersecret',
        resave: false,
        saveUninitialized: false
    }),
)


httpServer.listen(port, () => {
    console.log(`Listening on ${port}`)
})