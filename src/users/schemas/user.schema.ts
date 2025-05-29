import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uniqueValidator from 'mongoose-unique-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id?: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, min: 16, max: 60 })
  age: number;

  @Prop({ required: true, match: /^01\d{9}$/ })
  mobileNumber: string;

  @Prop({ enum: ['admin', 'normal'], default: 'normal' })
  role: 'admin' | 'normal';
}

const UserSchema = SchemaFactory.createForClass(User);

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

// Hash password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export { UserSchema };
