"use client";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import Results from "@/components/results";

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
            <div className=" cursor-pointer rounded-xl border border-[#4F4F4F] p-2 text-xl text-white" onClick={()=>router.push("/practise-site/chapters")}><img src="/left.svg" className=" inline-block"/> &nbsp;{" "}Back to chapters</div>
            <div className=" cursor-pointer rounded-xl border border-[#4F4F4F] p-2 text-xl text-white" onClick={()=>router.push("/trial")}><img src="/retry.svg" className=" inline-block"/> &nbsp;{" "}Retry</div>
            <div className=" cursor-pointer rounded-xl border border-[#4F4F4F] p-2 text-xl text-white" onClick={()=>router.push("/practise-site")}><img src="/right.svg" className=" inline-block"/> &nbsp;{" "}Next</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
