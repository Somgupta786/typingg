import Navbar from "@/components/navbar";
const Page = () => {
  return (
    <div className=" flex flex-col  w-11/12  h-screen   mx-auto bg-black text-[#F6F6F6]">
      <Navbar />
      <div className=" flex h-[100%] w-full gap-[140px] mb-9 mt-6">
        <div className=" flex flex-col h-full justify-between gap-4 flex-shrink-[0]">
          <div className=" max-w-[245px] max-h-[245px]">
            <img src="/userLogo.svg" />
          </div>
          <div className=" flex flex-col gap-8">
            <div className=" text-3xl">
              Lakshayyyy
              <img className="inline" src="/badge.svg" />
            </div>
            <div className=" flex flex-col gap-2">
              <div className=" text-xl text-[#666666]">
                Avg. WPM:<span className=" text-white">103</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Avg. WPM:<span className=" text-white">103</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Avg. WPM:<span className=" text-white">103</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Avg. WPM:<span className=" text-white">103</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Avg. WPM:<span className=" text-white">103</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Avg. WPM:<span className=" text-white">103</span>
              </div>
            </div>
          </div>
          <div className="px-[24px] py-[16px] text-center rounded-lg border-[1px] border-[#4F4F4F] cursor-pointer font-bold">
            View on leaderboard
          </div>
        </div>
        <div className=" w-full flex flex-col gap-8 ">
          <div>
            {" "}
            <div className=" text-2xl">Want to track your progress?</div>
            <div className=" text-xl text-[#B0B0B0]">
              To track your progress, here is your last four(4) matches’
              results!! Give it a look and try to improve on it accordingly.
            </div>
          </div>
          <div className=" h-full flex flex-col gap-8  ">
            <div className="  border border-[#303030] rounded-[8px]">
              {" "}
              <div className=" pl-4 text-[14px] py-2">Speed test</div>
              <hr className=" h-[1px] border-0 bg-[#303030] " />
              <div className=" flex justify-around gap-6 py-3">
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">WPM</span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">
                    Accuracy
                  </span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">Seconds</span>
                </div>
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">Raw</span>
                </div>
              </div>
            </div>
            <div className="  border border-[#303030] rounded-[8px]">
              {" "}
              <div className=" pl-4 text-[14px] py-2">Speed test</div>
              <hr className=" h-[1px] border-0 bg-[#303030] " />
              <div className=" flex justify-around gap-6 py-3">
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">WPM</span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">
                    Accuracy
                  </span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">Seconds</span>
                </div>
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">Raw</span>
                </div>
              </div>
            </div>
            <div className="  border border-[#303030] rounded-[8px]">
              {" "}
              <div className=" pl-4 text-[14px] py-2">Speed test</div>
              <hr className=" h-[1px] border-0 bg-[#303030] " />
              <div className=" flex justify-around gap-6 py-3">
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">WPM</span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">
                    Accuracy
                  </span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">Seconds</span>
                </div>
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">Raw</span>
                </div>
              </div>
            </div>
            <div className="  border border-[#303030] rounded-[8px]">
              {" "}
              <div className=" pl-4 text-[14px] py-2">Speed test</div>
              <hr className=" h-[1px] border-0 bg-[#303030] " />
              <div className=" flex justify-around gap-6 py-3">
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">WPM</span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">
                    Accuracy
                  </span>
                </div>
                <div className=" text-4xl">
                  48
                  <span className=" text-2xl text-[#888888] ml-1">Seconds</span>
                </div>
                <div className=" text-4xl">
                  48<span className=" text-2xl text-[#888888] ml-1">Raw</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default Page;
