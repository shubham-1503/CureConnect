import { useMediaQuery } from 'react-responsive';
import { Datepicker } from "flowbite-react";

function Calendar({ selectedDate, onDateChange }) {

  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
  
  const customTheme = {
    root: {
      base: "relative",
    },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-1",
        inline: "relative top-0 z-auto",
        inner:
          "inline-block rounded-lg bg-whiteColor p-4 shadow-lg",
      },
      header: {
        base: "",
        title:
          "px-2 py-3 text-center font-semibold text-secondaryColor",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-whiteColor px-5 py-2.5 text-sm font-semibold text-secondaryColor hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-secondaryColor",
            prev: "",
            next: "",
            view: "",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium",
          today:
            "bg-secondaryColor text-white hover:bg-primaryColor transition duration-200 ease-in-out",
          clear:
            "border border-secondaryColor border-2 bg-whiteColor text-secondaryColor hover:bg-gray-200 transition duration-200 ease-in-out",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title:
            "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-secondaryColor hover:bg-gray-200",
            selected: "bg-primaryColor text-whiteColor hover:bg-darkPrimary",
            disabled: "text-gray-500",
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-secondaryColor hover:bg-gray-200",
            selected: "bg-primaryColor text-whiteColor hover:bg-darkPrimary",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-secondaryColor hover:bg-gray-200",
            selected: "bg-primaryColor text-whiteColor hover:bg-darkPrimary",
            disabled: "text-gray-500",
          },
        },
      },
      decades: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-secondaryColor hover:bg-gray-200",
            selected: "bg-primaryColor text-whiteColor hover:bg-darkPrimary",
            disabled: "text-gray-500",
          },
        },
      },
    },
  };

  const handleDateChange = (date) => {
    // Pass the UTC date to the onDateChange callback
    onDateChange(date);
  };

  return (
    <Datepicker
      theme={customTheme}
      minDate={new Date()}
      value={selectedDate}
      inline={isMediumScreen}
      className="w-full md:w-80" 
      onSelectedDateChanged={handleDateChange}
    />
  );
}

export default Calendar;
