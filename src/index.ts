import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schema from './schema';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => console.log('DB connected'));

app.listen(PORT, () => console.log('Server is  running'));
