import { Connection } from 'mongoose';
import { historySchema } from '../schema/history.schema';

export const historiesProviders = [
  {
    provide: 'HISTORY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('History', historySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
