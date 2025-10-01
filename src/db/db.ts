import mongoose from "mongoose";

export enum GenderType {
  male,
  female,
  other,
}

export enum ProjectType {
  featureFilm = "Feature Film",
  webSeries = "Web Series",
  shortFilm = "Short Film",
  commercial = "Commercial",
  theater = "theater",
  documentary = "Documentary",
}

const talentSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  email: { type: String, require: true },
  state: { type: String, require: true },
  city: { type: String, require: true },
  age: { type: Number, require: true },
  gender: { type: String, require: true, enum: Object.values(GenderType) },
  password: { type: String, require: true },
  preferences: { type: Array, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const industryProfessionalSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

const jobSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IndustryProfessional",
    require: true,
  },
  title: { type: String, require: true },
  prjectName: { type: String, require: true },
  projectType: {
    type: String,
    require: true,
    enum: Object.values(ProjectType),
  },
  description: { type: String, require: true },
  requirements: { type: String, require: true },
  ageRange: { type: String, require: true },
  gender: { type: String, require: true, enum: Object.values(GenderType) },
  experienceLevel: { type: String, require: true },
  location: { type: String, require: true },
  deadline: { type: Date, require: true },
  contactEmail: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserToJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Talent",
    require: true,
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", require: true },
});

export const Talent = mongoose.model("Talent", talentSchema);
export const IndustryProfessional = mongoose.model(
  "IndustryProfessional",
  industryProfessionalSchema,
);
export const Job = mongoose.model("Job", jobSchema);
export const userToJob = mongoose.model("UserToJob", UserToJobSchema);

