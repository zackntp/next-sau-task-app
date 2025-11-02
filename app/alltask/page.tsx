"use client";

import Image from "next/image";
import task from "./../../assets/images/task.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./../../lib/supabaseClient";
import Footer from "@/components/Footer";
type Task = {
  id: string;
  created_at: string;
  title: string;
  detail: string;
  image_url: string;
  is_completed: boolean;
  update_at: string;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await supabase
        .from("task_tb")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง");
        console.log(error.message);
        return;
      }
      if (data) {
        setTasks(data as Task[]);
      }
    };
    fetchTask();
  }, []);

  const handleDeleteClick = async (id: string) => {
    if (confirm("คุณแน่ใจที่จะลบงานนี้หรือไม่ ?")) {
      const { data, error } = await supabase
        .from("task_tb")
        .delete()
        .eq("id", id);
      if (error) {
        alert("เกิดข้อผิดพลาดในการลบ");
        console.log(error.message);
        return;
      }
      setTasks(tasks.filter((task) => task.id !== id));

      alert("ลบข้อมูลเรียบร้อยแล้ว");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Top */}
        <Image className="mt-20" src={task} alt="Task" width={150} />
        <h1 className="mt-5 text-2xl font-bold text-blue-500">
          Manage Task App
        </h1>
        <h1 className="mt-2 text-lg text-blue-500">บริหารจัดการงานที่ทำ</h1>

        {/* ส่วนปุ่มเพิ่มงาน */}
        <div className="flex justify-end w-10/12">
          <Link
            className="bg-blue-500 px-10 py-2 hover:bg-blue-700 rounded"
            href={"/addtask"}
          >
            เพิ่มงาน
          </Link>
        </div>
        {/* ส่วนแสดงรายการงานทั้งหมด */}
        <div className="flex mt-5 w-10/12">
          <table className="w-full border">
            <thead>
              <tr className="text-center border font-bold bg-gray-300">
                <td className="border p-2">รูป</td>
                <td className="border p-2">งานที่ต้องทำ</td>
                <td className="border p-2">รายละเอียดงาน</td>
                <td className="border p-2">สถานะ</td>
                <td className="border p-2">วันที่เพิ่ม</td>
                <td className="border p-2">วันที่แก้ไข</td>
                <td className="border p-2">ACTION</td>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td
                    className="border p-2 text-center
                  
                  "
                  >
                    {task.image_url ? (
                      <Image
                        className="mx-auto"
                        src={task.image_url}
                        alt={task.title}
                        width={50}
                        height={50}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.detail}</td>
                  <td className="border p-2">
                    {task.is_completed == true ? "สำเร็จ" : "ไม่สำเร็จ"}
                  </td>
                  <td className="border p-2">
                    {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {new Date(task.update_at).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <Link
                      className="text-green-600 mr-5 hover:text-green-700"
                      href={`updatetask/${task.id}`}
                    >
                      แก้ไข
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(task.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
