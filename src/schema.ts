import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        todo: { type: GraphQLString },
      },
      resolve(_parent, args) {
        const newTodo = new Todo({
          todo: args.todo,
          isCompleted: false,
        });
        return newTodo.save();
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, args) {
        return Todo.findByIdAndRemove(args.id);
      },
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        todo: { type: GraphQLString },
        isCompleted: { type: GraphQLBoolean },
      },
      resolve(_parent, args) {
        const updateTodo = { ...args };
        args.todo && (updateTodo.todo = args.todo);
        args.isCompleted && (updateTodo.isCompleted = args.isCompleted);
        return Todo.findByIdAndUpdate(args.id, updateTodo, { new: true });
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
