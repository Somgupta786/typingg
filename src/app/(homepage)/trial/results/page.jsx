"use client"
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import Results from "@/components/results";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { BarChart } from '@mui/x-charts/BarChart';

const Page = () => {
  const router = useRouter();
  const [showStats, setShowStats] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col w-11/12 mx-auto whitespace-nowrap">
      <Navbar />
      <div className="flex flex-col min-w-[953px] gap-28 mx-auto mt-16">
        <Results />
        <div className="flex mx-auto gap-16">
          <div
            className="cursor-pointer rounded-xl border border-[#4F4F4F] p-2 text-xl text-white"
            onClick={() => router.push("/practise-site/chapters")}
          >
            <img src="/left.svg" className="inline-block" /> &nbsp; Back to
            chapters
          </div>
          <div
            className="cursor-pointer rounded-2xl border border-[#4F4F4F] p-2 text-xl text-white w-[108px] h-[46px] flex justify-center items-center"
            onClick={handleOpen}
          >
            <img src="/right.svg" className="inline-block" /> &nbsp; Stats
          </div>
          <div
            className="cursor-pointer rounded-2xl border border-[#4F4F4F] p-2 text-xl text-white w-[115px] h-[46px] flex justify-center items-center"
            onClick={() => router.push("/trial")}
          >
            <img src="/retry.svg" className="inline-block" /> &nbsp; Retry
          </div>
        </div>

        {/* Modal Component */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center"
        >
          <div className="flex justify-center items-center bg-[#1A1A1A] rounded-xl border border-[#4F4F4F]">
            <BarChart
              xAxis={[
                { 
                  scaleType: "band", 
                  data: ["group A", "group B"],
                  axisColor: "#FFFFFF", // Set axis color to white
                  padding: { left: 10, right: 10 } // Add padding between bars and axis
                }
              ]}
              yAxis={[
                {
                  axisColor: "#FFFFFF", // Set y-axis color to white
                  padding: { top: 10, bottom: 10 } // Add padding on the y-axis
                }
              ]}
              series={[
                { data: [4, 3], color: "#D5E94E" }, 
                { data: [1, 6], color: "#EA4F26" },
              ]}
              width={846}
              height={589}
              style={{ backgroundColor: "#1A1A1A" }}
              grid={{ vertical: true }}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
