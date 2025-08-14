

import express from 'express';
import cors from 'cors';

import { Datastore } from '@google-cloud/datastore';
import path from 'path';
import { fileURLToPath } from 'url';





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port =process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'requests.html'));
});

app.use(express.json());
app.use(cors());



const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const datastore = new Datastore({
  projectId: credentials.project_id,
  credentials
});


import crypto from 'crypto';

app.post('/submit-fund-request', async (req, res) => {
    const {country, category, amount, cause, bankName, accountNumber } = req.body;


    
    if ( !country || !category || !amount || !cause || !bankName || !accountNumber) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

  

    const compositeKey = crypto.randomUUID();
    const entityKey = datastore.key(['fundRequests', compositeKey]); 
    
    console.log("Generated Composite Key:", compositeKey);
    console.log("Generated Entity Key:", entityKey);
   
    const entity = {
        key: entityKey,
        data: [
          { name: 'compositeKey', value: compositeKey },
            { name: 'country', value: country, excludeFromIndexes: true },
            { name: 'category', value: category, excludeFromIndexes: true },
            { name: 'amount', value: parseInt(amount, 10) },
            { name: 'cause', value: cause, excludeFromIndexes: true },
            { name: 'bankName', value: bankName, excludeFromIndexes: true },
            { name: 'accountNumber', value: accountNumber.toString() } 
        ]
    };

    console.log('Entity being saved:', entity);

    try {
       
        await datastore.save(entity);
        console.log('Fund request saved successfully');
        res.status(200).json({ message: 'Request submitted successfully!' });
    } catch (error) {
        console.error('Error saving data to Datastore:', error.stack);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            details: error.stack
        });
    }
});
app.get('/fetch-fund-requests', async (req, res) => {
  try {
      const query = datastore.createQuery('fundRequests');
      const [entities] = await datastore.runQuery(query);

      const fundRequests = entities.length
            ? entities.map(entity => ({
                ...entity,
                compositeKey: entity[datastore.KEY]?.name
            }))
            : []; 

      

      res.status(200).json({ fundRequests });
  } catch (error) {
      console.error("Error fetching requests:", error.message);
      res.status(500).json({ message: "Failed to fetch fund requests" });
  }
});
app.delete('/delete-fund-request/:compositeKey', async (req, res) => {
  const { compositeKey } = req.params;
  if (!compositeKey) {
      return res.status(400).json({ message: "Invalid request ID." });
  }

  const entityKey = datastore.key(['fundRequests', compositeKey]); 
  try {
      await datastore.delete(entityKey);
      res.status(200).json({ message: "Request deleted successfully!" });
  } catch (error) {
      console.error("Error deleting request:", error.message);
      res.status(500).json({ message: "Failed to delete request." });
  }
});






