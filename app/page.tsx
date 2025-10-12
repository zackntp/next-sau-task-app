import Image from "next/image";
import task from "./../assets/images/task.png";
import Link from "next/link";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Image className="mt-20" src={task} alt="Task" width={300} />
        <h1 className="mt-10 text-4xl font-bold text-blue-500">
          Manage Task App
        </h1>
        <h1 className="mt-5 text-2xl text-blue-500">บริหารจัดการงานที่ทำ</h1>
        <Link
          className="px-20 py-5 bg-blue-500 mt-10 rounded text-white hover:bg-blue-800 cursor"
          href={"/alltask"}
        >
          เข้าใช้งานแอปพลิเคชั่น
        </Link>
        <Footer />
      </div>
    </>
  );
}
