"use client";
import Navbar from "@/components/navbar";
import SpeedTest from "@/components/speedTest";
import { useState } from "react";


const Page = () => {
  const [selectedTime, setSelectedTime] = useState(15);
  const [getStarted, setGetStarted] = useState(false);

  const times = [15, 30, 60];

  return (
    <div className="flex flex-col w-11/12 mx-auto select-none ">
      <div className={`${getStarted ? "hidden" : ""}`}>
        <Navbar />
      </div>

      <div className="flex flex-col gap-20">
        <SpeedTest time={selectedTime} started={getStarted} />
        <div  className={` flex flex-col gap-20 ${getStarted ? "hidden" : ""}`}>
          {" "}
          <div className="flex gap-2 text-2xl text-white self-center">
            {times.map((time) => (
              <div
                key={time}
                className={`border border-[#4F4F4F] p-2 rounded-2xl cursor-pointer ${
                  selectedTime === time ? "bg-[#D5E94E] text-black" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time} <span className="text-base">seconds</span>
              </div>
            ))}
          </div>
          <div
            className="mt-[103px] text-[85px] leading-[127px]  font-medium bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundImage: `
      linear-gradient(90deg, #E94EB6 0%, #624EE9 100%)
    `,
            }}
          >
            The Top Ways to Improve Your Typing{" "}
            <span className="bg-none text-[#FFFFFF] italic">
              Speed and Accuracy
            </span>{" "}
            in Little to No Time
          </div>
          <div className=" flex flex-col mt-[68px] gap-28">
            <div className=" flex flex-col gap-6">
              <div className=" text-6xl text-white">
                Make Sure You Sit Comfortable Before You Get Started
              </div>
              <div className=" text-2xl text-[#B0B0B0]">
                Before you focus on improving your typing speed by taking the
                words per minute test, take the time to get situated in a
                comfortable position. It's harder to type well when standing in
                place, leaning over the keyboard, or sitting on an uncomfortable
                chair that causes you to experience back or neck pain. It's far
                better to sit on a comfortable, supportive chair while
                maintaining a good posture to increase your comfort before you
                begin typing away. If you feel good, you can focus more on
                typing than anything else.
              </div>
            </div>
            <div className=" flex flex-col gap-6">
              <div className=" text-6xl text-white">
                Become More Familiarized with the Location of the Letter Keys on
                the Keyboard
              </div>
              <div className=" text-2xl text-[#B0B0B0]">
                If you want to get better at typing quickly and more accurately,
                it helps to study the keyboard and try remembering where
                different letters are located. Since the letters aren't in the
                standard order of A, B, C, D, and so forth, it's a bit tricky at
                first. However, because of muscle memory, once you get the hang
                of using the keyboard quite often, your fingers will start
                remembering the exact location of the different letters. Most
                keyboards will have the letters in the same spots unless they’re
                used for specific reasons, such as gaming, so once you know
                where they go, you can get the hang of positioning your fingers
                in the right spots.
              </div>
            </div>
            <div className=" flex flex-col gap-6">
              <div className=" text-6xl text-white">
                Practice Daily with a Convenient English Typing Test
              </div>
              <div className=" text-2xl text-[#B0B0B0]">
                Once you've found a comfortable position, start practicing
                typing while taking a convenient and fun English Typing
                Test.Once you're on the website, begin typing the words in the
                box on the screen, focusing more on accuracy than anything else.
                While you're typing away at the words, the clock is counting
                down, timing how long it takes you to type out different words
                within 60 seconds. After the minute passes, you will have the
                chance to review your words per minute, characters, and
                accuracy. You will also find out how well your speed is compared
                to others, whether you're moving at the slower pace of a turtle
                or a quick speed like a cheetah. The best part about using the
                typing speed tests is that you can take it as many times as
                you'd like while improving your skill. You can take the test for
                hours on end if you feel like it!
              </div>
            </div>
            <div className=" flex flex-col gap-6">
              <div className=" text-6xl text-white">
                Try to Improve Your Accuracy Before Focusing Solely on Enhancing
                Your Speed
              </div>
              <div className=" text-2xl text-[#B0B0B0]">
                Don't forget to work on your accuracy before worrying too much
                about the speed at which you type. It won't matter if you can
                type 100 words per minute or more if the words don't make much
                sense. Instead, you should prioritize improving your speed and
                begin working on receiving higher accuracy so that what you're
                typing makes sense and isn't grammatically incorrect. The best
                way to focus on accuracy is to type out the words in front of
                you without paying too much attention to the clock. The
                countdown timer is there to give you an idea of how fast you're
                moving, but it's not something you need to look at or worry
                about when you want to improve accuracy.
              </div>
            </div>
            <div className=" flex flex-col gap-6">
              <div className=" text-6xl text-white">
                Practice Makes Perfect: Take the Typing Speed Online Test as
                Often as You Need
              </div>
              <div className=" text-2xl text-[#B0B0B0]">
                Now that you know what it takes to improve your typing skill,
                speed, and accuracy, take the online Typing test as often as you
                want and need! If you're serious about becoming an even better
                typist, it's a good idea to practice in 30-60 minute intervals
                throughout the day. Try testing yourself first thing in the
                morning and then later in the evening, especially if you have
                some free time available.
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              {" "}
              <div
                className="text-[85px] leading-[127px] italic font-medium bg-clip-text text-transparent whitespace-pre-wrap w-[80%] animate-gradient"
                style={{
                  backgroundImage: `
      linear-gradient(90deg, #E94EB6 0%, #624EE9 100%)
    `,
                }}
              >
                It's your time to type at lightning speed!
              </div>
              <div className=" flex flex-col text-6xl gap-6 text-white ">
                <div>Time-strain practice sessions</div>
                <div>Fun typing games to boost speed</div>
                <div>Continuous improvement exercises</div>
                <div>Compete with friends to enhance skills</div>
              </div>
            </div>
          </div>
          <hr className=" border border-[#4F4F4F] ml-[-70px] w-screen" />
          <div className=" flex flex-col gap-12 items-center mb-10">
            <div className=" text-2xl">Get Started Today</div>
            <div className=" flex gap-8">
              <div
                className="px-[24px] py-[12px] w-[142px] rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-base text-black font-bold cursor-pointer text-center"
                onClick={() => setGetStarted(true)}
              >
                Get Started
              </div>
              <div className="px-[24px] py-[12px] w-[142px] rounded-lg border-[1px] bg-black border-[#4F4F4F] whitespace-nowrap text-base text-white font-bold cursor-pointer text-center">
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
