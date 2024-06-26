const HomePage = (props) => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center bg-[url('../public/images/background.png')] bg-contain md:bg-cover  ">
      <div className="h-screen w-full flex flex-col justify-start gap-2 items-center  pt-24 md:pt-36 px-2 md:px-5 ">
        <div className=" w-full mb-5 ">
          <div className="text-white text-2xl font-black w-full  px-2">
            Welcome to
          </div>
          <div className="text-white text-6xl font-black w-full px-2">
            Catch Up
          </div>
        </div>
        <div className="text-white text-md md:text-xl font-black w-full  px-3">
          We are excited to have you here! <br></br>Connect with friends,
          family, and colleagues effortlessly.<br></br> Dive into conversations,
          share moments, and make memories. <br></br>If you have any questions
          or need help, do not hesitate to reach out.<br></br> Happy chatting!
          <br></br>
          <br></br> This is a MERN full-stack messaging application that allows
          users to interact with one another.<br></br> Your conversations are
          secure and readable by no one other that you and your buddies.
        </div>
        <div className="text-white text-md md:text-xl font-black w-full  px-3">
          Signup to start catching up with people
        </div>
      </div>
    </div>
  );
};
export default HomePage;
