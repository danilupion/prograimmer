import { UserDocument } from '../model/user.js';

export const getTokenPayload = (user: UserDocument) => ({
  id: user._id.toString(),
  email: user.email,
  username: user.username,
  role: user.role,
});
