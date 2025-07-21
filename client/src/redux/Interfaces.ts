export interface User {
  _id: string;
  username: string;
  email: string;
  admin: boolean;
  image: string | undefined;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserState {
  user: User | null;
  loggingIn: boolean;
  signingUp: boolean;
  loginError: string | null;
  signupError: string | null;
  message: string | null;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface SigninData {
  email: string;
  password: string;
}

//! ROOM
export interface Room {
  _id: string;
  name: string;
  description: string;
  ownerId: string;
  tags: [];

  createdAt?: Date;
  updatedAt?: Date;
}
export interface RoomState {
  allRooms: Room[];
  roomId: string | null;
  loading: boolean;
  error: string | null;
  isCreating: boolean;
  roomMessage: string | null;
  room: Room | null;
}

export interface RoomData {
  name: string;
  description: string;
}

//! MESSSAGE
export interface MessageData {
  message: string;
  roomId: string | null;
}

export interface Message {
  _id: string;
  message: string;
  senderId: User;
  roomId: string;
  seen: string[];

  createdAt?: string;
  updatedAt?: string;
}

export interface MessageState {
  messages: Message[];
  loadingMessages: boolean;
  notif: boolean;
}
