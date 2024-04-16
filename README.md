# Proposal Prototype Application

* *Date Created*: 25 Feb 2024
* *Last Modification Date*: 27 Feb 2024
* *Assignment URL*: <https://cure-connect.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/bmevawala/csci-5709-group-12>

## Authors

* [Aniket Mhatre](an370985@dal.ca) [B00969798]
* [Bhavya Mevawala](bh84221@dal.ca) [B00953053]
* [Heramb Kulkarni](hr835429@dal.ca) [B00962182]
* [Manan Mistry](manan.mistry@dal.ca) [B00948831]
* [Parth Karkhanis](pr401159@dal.ca) [B00959176]
* [Shubham Pawar](sh764760@dal.ca) [B00969363]



## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
* [npm](https://docs.npmjs.com//) - Dependency Management
* [TailwindCss](https://tailwindcss.com/docs) - CSS Framework


## Sources Used

### MainContent.jsx

*Lines 18 - 24*

```
<ReactTyped
    className="md:text-3xl sm:text-4xl text-xl font-bold md:pl-2 pl-2"
    strings={["Appointments", "Consultations", "Pharmacy"]}
    typeSpeed={100}
    backSpeed={120}
    loop
/>
```

The code above was created by adapting the code in [ReactTyped Documentation](https://www.npmjs.com/package/react-typed) as shown below: 

```
import { ReactTyped } from "react-typed";

const MyComponent = () => (
  <div>
    <ReactTyped strings={["Here you can find anything"]} typeSpeed={40} />
    <br />

    <ReactTyped
      strings={[
        "Search for products",
        "Search for categories",
        "Search for brands",
      ]}
      typeSpeed={40}
      backSpeed={50}
      attr="placeholder"
      loop
    >
      <input type="text" />
    </ReactTyped>
  </div>
);
```

- The implementation of the code in the [ReactTyped Package](https://www.npmjs.com/package/react-typed) involved a comprehensive examination of the original source, ensuring a thorough understanding of its functionality and logic.
- [ReactTyped Package](https://www.npmjs.com/package/react-typed) provides typewriter effect. This code was used in landing pages to create a sense of anticipation and engagement by gradually revealing content, thus capturing the user's attention and encouraging them to continue reading.
- [ReactTyped Package](https://www.npmjs.com/package/react-typed)'s code was modified with different string values and different speed.

### Analytics.js

*Lines 42 - 53*

```
<CountUp
    end={stat.figure}
    suffix={stat.suffix}
    enableScrollSpy="true"
    delay={0}
>
    {({ countUpRef }) => (
    <div>
        <span ref={countUpRef} />
    </div>
    )}
</CountUp>
```

The code above was created by adapting the code in [ReactCountUp Documentation](https://www.npmjs.com/package/react-countup) as shown below: 

```
<CountUp start={0} end={100} delay={0}>
  {({ countUpRef }) => (
    <div>
      <span ref={countUpRef} />
    </div>
  )}
</CountUp>
```

- The code in [ReactCountUp Documentation](https://www.npmjs.com/package/react-countup) involved a comprehensive examination of the original source, ensuring a thorough understanding of its functionality and logic.
- [ReactCountUp Documentation](https://www.npmjs.com/package/react-countup)'s Counter effect is used in landing pages to make statistics visually appealing and create a sense of urgency or highlight achievements, ultimately grabbing the user's attention and potentially driving action.
- [ReactCountUp Documentation](https://www.npmjs.com/package/react-countup)'s Code was modified by adding extra properties suffix and enableScrollSpy to start animation once the component is visible.

### Testimonial.jsx

*Lines 12 - 40*

```
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
```

*Lines 82 - 99*

```
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
```

The code above was created by adapting the code in [ReactSlick Documentation](https://www.npmjs.com/package/react-slick) as shown below:  

```
import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}
```

- The code in [ReactSlick Documentation](https://www.npmjs.com/package/react-slick) involved a comprehensive examination of the original source, ensuring a thorough understanding of its functionality and logic.
- [ReactSlick Documentation](https://www.npmjs.com/package/react-slick)'s carousel effect simplifies navigating through different sections or highlights on the page, improving user experience and engagement. Moreover, its customizable features empower designers to craft engaging and interactive displays, effectively highlighting products, services.
- [ReactSlick Documentation](https://www.npmjs.com/package/react-slick)'s Code was modified by integrating customized icons for previous arrow and next arrow navigation by overriding props of the parent component.



## Acknowledgments

Image Credits
- [Animated Doctor Image](https://www.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_12557507.htm
)
- [Contant Us](https://storyset.com/illustration/call-center/cuate#utm_source=freepik&utm_medium=referall&utm_campaign=storiesdetail&utm_content=edit-button&utm_term=edit)
- [Old Lady](https://www.freepik.com/free-photo/close-up-portrait-senior-woman_21081258.htm#query=old%20lady&position=15&from_view=keyword&track=ais&uuid=90c40c3f-5c46-43d4-a92c-19050d58fc2f)
- [Doctor](https://www.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_20999942.htm#fromView=search&page=1&position=12&uuid=a60833c6-a570-47c4-96d0-a84172036d5b)
- [Teacher](https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs)
- [Software Engineer](https://www.freepik.com/free-photo/closeup-portrait-caucasian-happy-teacher-glasses_10586129.htm#fromView=search&page=1&position=1&uuid=e43d26de-76e6-4a52-95ff-fc2e23ead0ea)