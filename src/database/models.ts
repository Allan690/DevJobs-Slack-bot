import mongoose from 'mongoose';
import { string } from '@hapi/joi';

const { Schema } = mongoose;

const workspaceSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  teamId: {
    type: String,
    required: true
  },
  webhook: {
    type: String,
    required: true
  }
});

const workspaceModel = mongoose.model('Workspace', workspaceSchema);

export default workspaceModel;
