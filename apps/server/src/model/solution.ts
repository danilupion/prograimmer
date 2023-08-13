import normalizeJson from '@danilupion/turbo-server/middleware/mongoose/normalizeJson.js';
import owner from '@danilupion/turbo-server/middleware/mongoose/owner.js';
import timestamps from '@danilupion/turbo-server/middleware/mongoose/timestamps.js';
import { Solution } from '@prograimmer/common/model/solution.js';
import { Document, Schema, model } from 'mongoose';

export type SolutionDocument = Document & Solution;

const solutionSchema = new Schema(
  {
    input: {
      type: String,
      required: true,
    },
    result: new Schema({
      messages: {
        type: [
          new Schema({
            role: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          }),
        ],
        required: true,
      },
      files: [
        new Schema({
          file: {
            type: String,
            required: true,
          },
          language: {
            type: String,
            required: true,
          },
          code: {
            type: String,
            required: true,
          },
        }),
      ],
      usage: new Schema({
        prompt_tokens: {
          type: Number,
          required: true,
        },
        completion_tokens: {
          type: Number,
          required: true,
        },
        total_tokens: {
          type: Number,
          required: true,
        },
      }),
      finish_reason: {
        type: String,
        required: true,
      },
    }),
  },
  { collection: 'solutions' },
)
  .plugin(owner)
  .plugin(timestamps)
  .plugin(normalizeJson);

export default model<SolutionDocument>('Solution', solutionSchema);
