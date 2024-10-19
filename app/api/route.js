import { ConnectDB } from "@/lib/config/db";
import TaskModel from "@/lib/models/TaskModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const tasks = await TaskModel.find({});

  return NextResponse.json({ tasks: tasks });
}

export async function POST(request) {
  const { title, description } = await request.json();

  await TaskModel.create({ title, description });

  return NextResponse.json({ msg: "Task added" });
}

export async function DELETE(request) {
  const mongoID = await request.nextUrl.searchParams.get("mongoId");
  await TaskModel.findByIdAndDelete(mongoID);

  return NextResponse.json({ msg: "Task deleted" });
}

export async function PUT(request) {
  const mongoID = await request.nextUrl.searchParams.get("mongoId");
  await TaskModel.findByIdAndUpdate(mongoID, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({ msg: "Task completed" });
}
