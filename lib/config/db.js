import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://practiceandothers:Taskmanager2024@taskmanager.vhepn.mongodb.net/task-manager",
  );
  console.log("DB Connected");
};
