'use client';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  // List of nav items with paths
  const navItems = [
    { label: 'Speed Test', path: '' },
    { label: 'Play Games', path: '' },
    { label: 'Race', path: '' },
    { label: 'Practice', path: '/practise-site' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Keyboard test', path: '' }
  ];

  // Function to handle click and navigate
  const handleClick = (path) => {
    router.push(path); // Navigate to the path
  };

  return (
    <div className="flex py-6 justify-between items-center text-[#888888] font-normal text-[16px]">
      <div className="text-[20px] text-white">TypingSpeedtest</div>
      <div className="flex justify-between gap-12 cursor-pointer py-3">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.path)}
            className={`${pathname === item.path ? 'text-[#D5E94E]' : 'text-[#888888]'}`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div>
        <div className={` cursor-pointer ${pathname === "/trial2" ? 'text-[#D5E94E]' : 'text-[#888888]'}`}onClick={()=>router.push("/trial2")}>Lakshayyyy</div>
      </div>
    </div>
  );
};

export default Navbar;
