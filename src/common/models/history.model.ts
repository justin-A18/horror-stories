import { SchemaType } from '@google/generative-ai';

export const schema = {
  description: 'A horror story',
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: 'Title of the horror story',
      nullable: false,
    },
    plot: {
      type: SchemaType.STRING,
      description: 'Plot summary of the horror story',
      nullable: false,
    },
  },
  required: ['title', 'plot'],
};
