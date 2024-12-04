"use client";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import Results from "@/components/practiseResult";

const Page = () => {
  // localStorage.removeItem("token");
  const router = useRouter();

  return (
    <div className="flex flex-col w-11/12 mx-auto whitespace-nowrap">
      <Navbar />
      <div className=" flex flex-col min-w-[953px] gap-28 mx-auto mt-16">
        {" "}
        <Results />
        <div className=" flex mx-auto gap-16">
          <div
            className=" cursor-pointer rounded-2xl border border-[#4F4F4F] p-2 text-xl text-white w-[108px] h-[46px] flex justify-center items-center"
            onClick={() => router.push("/speed-test")}
          >
            <img src="/right.svg" className=" inline-block" /> &nbsp; Next
          </div>
          <div
            className=" cursor-pointer rounded-2xl border border-[#4F4F4F] p-2 text-xl text-white w-[115px] h-[46px] flex justify-center items-center"
            onClick={() => router.push("/speed-test")}
          >
            <img src="/retry.svg" className=" inline-block" /> &nbsp; Retry
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
