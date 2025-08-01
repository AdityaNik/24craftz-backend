import mongoose from 'mongoose';

export enum Role {
    talent,
    industry
}

export enum Gender {
    male,
    female,
    other
}

const UserSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    phoneNumber: {type: String, require: true },
    email: {type: String, require: true},
    state: {type: String, require: true},
    city: {type: String, require: true},
    age: {type: Number, require: true},
    gender: {type: String, require: true, enum: Object.values(Gender)},
    password: {type: String, require: true },
    role: {type: String, require: true, enum: Object.values(Role)},
    preferences: {type: Array, require: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export const User = mongoose.model('User', UserSchema);