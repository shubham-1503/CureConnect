import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// Image Credits: https://www.freepik.com/free-photo/close-up-portrait-senior-woman_21081258.htm#query=old%20lady&position=15&from_view=keyword&track=ais&uuid=90c40c3f-5c46-43d4-a92c-19050d58fc2f
import SeniorWoman from "../../assets/senior-woman.jpeg";

// Image Credits: https://www.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_20999942.htm#fromView=search&page=1&position=12&uuid=a60833c6-a570-47c4-96d0-a84172036d5b
import LadyDoctor from "../../assets/doctor.jpeg";

// Image Credits: https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs
import Teacher from "../../assets/teacher.jpeg";

// Image Credits: https://www.freepik.com/free-photo/closeup-portrait-caucasian-happy-teacher-glasses_10586129.htm#fromView=search&page=1&position=1&uuid=e43d26de-76e6-4a52-95ff-fc2e23ead0ea
import SDE from "../../assets/software_engineer.jpeg";

function Testimonial() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <MdKeyboardArrowLeft
        className="absolute top-[50%] start-0 z-20 flex items-center justify-center w-6 h-6 md:w-10 md:h-10 cursor-pointer hover:text-primaryColor "
        onClick={onClick}
      />
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <MdKeyboardArrowRight
        className="absolute top-[50%] right-0 z-20 lg:end-0 flex items-center justify-center w-6 h-6 md:w-10 md:h-10 cursor-pointer hover:text-primaryColor"
        onClick={onClick}
      />
    );
  }

  const data = [
    {
      name: "Evelyn Williams",
      profile: "68, Retired",
      review:
        "I've been using this website for my medical needs, and I must say, it has been a blessing. At my age, going to the doctor's office can be quite challenging, but being able to consult with doctors online has made it so much easier for me. The doctors are compassionate and understanding, and they take the time to address all my concerns. Ordering medicines online has also been a breeze. Thank you for providing such a valuable service!",
      imgSrc: SeniorWoman,
    },
    {
      name: "Dr. Sarah Johnson",
      profile: "29, Cardiologist",
      review:
        "As a practicing cardiologist, I've had the opportunity to collaborate with this website for online consultations, and I'm impressed by the platform's dedication to patient care and convenience. The interface is intuitive, allowing for seamless interactions with patients. The platform also prioritizes patient privacy and ensures a secure environment for consultations. It has been a pleasure working with this website to provide accessible healthcare solutions to patients.",
      imgSrc: LadyDoctor,
    },
    {
      name: "Sophia Brown",
      profile: "27, Teacher",
      review:
        "I was a bit skeptical about online doctor consultations at first, but this website exceeded my expectations. The doctors are attentive and provide thorough consultations. The process of ordering medicines is smooth, and I appreciate the timely delivery. Overall, a fantastic experience!",
      imgSrc: Teacher,
    },
    {
      name: "Michael Scott",
      profile: "24, Software Engineer",
      review:
        "As someone with a busy schedule, this website has been a lifesaver for me. The ability to consult with doctors online and order medicines from the comfort of my home has saved me a lot of time and hassle. The platform is reliable, and the customer support team is always helpful.",
      imgSrc: SDE,
    },
  ];

  return (
    <div>
      <div className="w-full h-full mx-auto px-4 sm:px-6 py-10 lg:px-8 bg-backgroundColor text-center ">
        <section className="flex-col items-center text-center">
          <h2 className="text-3xl text-center font-bold tracking-tight text-secondaryColor sm:text-4xl mb-6">
            {" "}
            Our Family{" "}
          </h2>
          <div className="bg-whiteColor shadow sm:rounded-lg p-10  md:mx-40 text-center">
            <Slider {...settings}>
              {data.map((d, index) => (
                <div className="p-6" key={index}>
                  <div className="flex justify-center h-48">
                    <img
                      className="w-40 h-40 rounded-full hover:scale-110 transition duration-200 ease-in-out object-cover"
                      src={d.imgSrc}
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-2xl font-bold ">{d.name}</p>
                    <p className=" text-md text-gray-500">{d.profile}</p>
                    <p>{d.review}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Testimonial;
