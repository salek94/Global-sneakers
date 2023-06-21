export const settings = {
  adaptiveHeight: true,
  arrows: true,
  speed: 1000,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  // initialSlide: 3,
  responsive: [
    {
      breakpoint: 414,
      settings: {
        adaptiveHeight: true,
        arrows: false,
        speed: 1000,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },
  ],
};

export const settingsCollectionAll = {
  adaptiveHeight: true,
  arrows: false,
  lazyLoad: true,
  infinite: true,
  slidesToShow: 4,
  rows: 4,
  responsive: [
    {
      breakpoint: 414,
      settings: {
        adaptiveHeight: true,
        arrows: false,
        speed: 1000,
        infinite: true,
        slidesToShow: 3,
        row: 6,
        dots: true,
      },
    },
  ],
  // slidesPerRow: 1,
};
export const settingsCollection = {
  adaptiveHeight: true,
  arrows: false,
  lazyLoad: true,
  infinite: true,
  slidesToShow: 3,
  rows: 2,
  responsive: [
    {
      breakpoint: 414,
      settings: {
        adaptiveHeight: false,
        arrows: false,
        speed: 1000,
        infinite: true,
        slidesToShow: 2,
        row: 4,
        dots: true,
      },
    },
  ],
  // slidesPerRow: 1,
};

export const settingsCollectionSearch = {
  adaptiveHeight: true,
  arrows: false,
  lazyLoad: true,
  infinite: true,
  slidesToShow: 5,
  rows: 1,
  responsive: [
    {
      breakpoint: 414,
      settings: {
        adaptiveHeight: false,
        arrows: false,
        speed: 1000,
        infinite: true,
        slidesToShow: 2,
        row: 2,
        dots: true,
      },
    },
  ],
};
export const ToastContainerSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};

export const toastSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
