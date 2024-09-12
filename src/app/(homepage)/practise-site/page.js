import Navbar from "@/app/components/navbar";
import { chaptersData } from "@/app/data/chapters";
const Page = () => {
  return (
    <div className=" flex flex-col w-11/12 mx-auto ">
      <Navbar />
      <div className=" flex justify-between relative gap-[93px]">
        <div className="w-[210px] h-fit flex flex-col gap-4 text-white relative cursor-pointer select-none ">
          <div className="px-6 py-3">Basic</div>
          <div className="px-6 py-3">Beginner</div>
          <div className="px-6 py-3">Intermediate</div>
          <div className="px-6 py-3">Advanced</div>

          <div className="absolute right-0 top-0 h-full w-[1px] bg-gray-400"></div>
        </div>

        <div className="w-full grid grid-cols-3 gap-10">
          {chaptersData.map((item, id) => (
            <div key={id} className=" flex flex-col justify-between p-6 gap-6 bg-[#1A1A1A] rounded-xl">
              <div className=" flex flex-col gap-4">
                <div className=" text-[25px] leading-9">The World</div>
                <div className=" flex flex-col">
                  <div className=" flex justify-between">
                    <div>Let's Begin Your Journey</div>
                    <div>0%</div>
                  </div>
                  <div className=" h-2 w-full rounded-3xl bg-[#3D3D3D]"></div>
                </div>
              </div>
              <div className=" flex justify-between font-bold text-[13px]">
                <div className=" px-[47px] py-[10px] rounded-lg border-[1px] border-[#4F4F4F]">Start</div>
                <div className=" px-[47px] py-[10px] text-gray-600">View Stats</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
