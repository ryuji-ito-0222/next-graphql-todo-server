import graphql, {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Todo from './models/todo';

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    todo: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return Todo.findById(args.id);
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(_parent, _args) {
        return Todo.find({});
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
