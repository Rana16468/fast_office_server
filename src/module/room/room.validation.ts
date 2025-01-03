import { z } from 'zod';

const MeetingRoomZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    categorieId: z.string(),
    roomId: z.number(),
  }),
});

export const  MeetingRoomValidation={
    MeetingRoomZodSchema
}
