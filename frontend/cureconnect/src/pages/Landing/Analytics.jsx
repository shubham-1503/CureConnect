import CountUp from "react-countup";

function Analytics() {
  const stats = [
    {
      title: "Appointments Completed",
      figure: 90,
      suffix: "K+",
    },
    {
      title: "Expert Doctors",
      figure: 12,
      suffix: "K+",
    },
    {
      title: "Medicines Delivered",
      figure: "50",
      suffix: "K+",
    },
    {
      title: "Patients Served",
      figure: "80",
      suffix: "K+",
    },
  ];
  return (
    <div className=" w-full mx-auto px-4 sm:px-6 py-10 lg:px-8 bg-backgroundColor">
      <h2 className="text-3xl text-center font-bold tracking-tight text-secondaryColor sm:text-4xl">
        Our Statistics
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
        {stats.map((stat, index) => (
          <div
            className="bg-whiteColor overflow-hidden shadow sm:rounded-lg"
            key={index}
          >
            <div className="px-4 py-5 sm:p-6 flex-col">
              <div className="text-sm leading-5 font-medium text-secondaryColor truncate">
                {stat.title}
              </div>
              <div className="mt-1 text-3xl leading-9 font-semibold text-darkPrimary">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
