"use client";
import { useRouter, usePathname } from "next/navigation";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [open, setOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const userRef = useRef(null); // Reference to the username/avatar element
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

  const handleOpen = () => {
    if (userRef.current) {
      const rect = userRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom + 15, left: rect.left - 130 });
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const navItems = [
    { label: "Speed Test", path: "/speed-test" },
    { label: "Play Games", path: "/games" },
    { label: "Race", path: "" },
    { label: "Practice", path: "/practise-site" },
    { label: "Leaderboard", path: "/leaderboard" },
    { label: "Keyboard test", path: "/keyboardTest" },
  ];

  const handleClick = (path) => {
    router.push(path); // Navigate to the path
  };

  return (
    <div className="flex  py-6 justify-between items-center text-[#888888] font-normal text-[16px]">
      <div className="text-[20px] text-white">TypingSpeedtest</div>
      <div className="flex justify-between gap-12 cursor-pointer py-3">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.path)}
            className={`${
              pathname === item.path ? "text-[#D5E94E]" : "text-[#888888]"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div>
        <div
          ref={userRef} // Attach ref to the element
          className={` cursor-pointer ${
            pathname === "/trial2" ? "text-[#D5E94E]" : "text-[#888888]"
          }`}
          onClick={handleOpen}
        >
          Lakshayyy &nbsp;
          <img src="/userIcon.svg" className="inline-block" />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            position: "absolute",
            top: modalPosition.top,
            left: modalPosition.left,
            margin: 0,
          }}
        >
          <div
            style={{
              outline: "none", // Removes the default focus outline
            }}
            className="text-sm flex flex-col gap-2 text-white bg-[#1A1A1A] rounded-xl border border-[#4F4F4F] max-w-[248px]"
          >
            <div className="flex gap-2 hover:bg-[#2a2929] p-4 py-2 cursor-pointer">
              <div>
                <img
                  src={`https://ui-avatars.com/api/?name=Lakshayy&background=random`}
                  alt="L"
                  className="w-10 h-10 rounded-full mr-2"
                />
              </div>
              <div className="flex flex-col">
                <div>Lakshayyy</div>
                <div className="text-[10px] text-[#B0B0B0]">
                  lakshay.deszin@gmail.com
                </div>
              </div>
            </div>
            <hr className="border-[0.01px]  border-[#4F4F4F]" />
            <div className="flex flex-col gap-[6px]">
              <div
                className="flex gap-2 hover:bg-[#2a2929] p-4 py-1 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <div>
                  <img src="/navUser.svg" />
                </div>
                <div>Profile</div>
              </div>
              <div className="flex gap-2 hover:bg-[#2a2929] p-4 py-1 cursor-pointer" onClick={()=>router.push("/settings")}>
                <div>
                  <img src="/settings.svg" />
                </div>
                <div>Settings</div>
              </div>
            </div>
            <hr className="border-[0.1px] border-[#4F4F4F]" />
            <div className="flex gap-2 hover:bg-[#2a2929] p-4 py-1 cursor-pointer">
              <div>
                <img src="/notify.svg" />
              </div>
              <div className=" flex justify-between w-full select-none">
                {" "}
                <div>Notifications</div>
                <div
                  className={`w-7 h-4 flex items-center ${
                    isKeyboardOn ? "bg-[#D5E94E]" : "bg-gray-200"
                  } rounded-full p-1 cursor-pointer`}
                  onClick={() => setIsKeyboardOn(!isKeyboardOn)}
                >
                  <div
                    className={`h-3 w-3 rounded-full shadow-md transform duration-300 ${
                      isKeyboardOn
                        ? "translate-x-[10.5px] bg-black"
                        : "translate-x-[-2px] bg-black"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            <hr className="border-[0.1px] border-[#4F4F4F]" />
            <div className="flex gap-2 hover:bg-[#2a2929] p-4 py-1 cursor-pointer">
                <div>
                  <img src="/logout.svg" />
                </div>
                <div>Log out</div>
              </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
