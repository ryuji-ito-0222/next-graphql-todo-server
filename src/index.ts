import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schema from './schema';

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once('open', () => console.log('DB connected'));

app.use(express.json());
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log('Server is running'));
