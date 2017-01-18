// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const navbar_items = [
  {
    id: 1,
    name: "About Marie Mills",
    href: "http://www.yogamariemills/About/",
    route: "about",
    component: "AboutPage"
  },
  {
    id: 2,
    name: "Yoga Thurles",
    href: "http://www.yogamariemills/YogaThurles/",
    route: "YogaThurles",
    component: "YogaThurlesPage",
    subMenu: [
        {
          id: 1,
          name: "Cost",
          href: "http://www.yogamariemills/YogaThurles/",
          route: "YogaThurles/Cost",
          component: "yogaCostPage"
        },
        {
          id: 2,
          name: "What to Bring",
          href: "http://www.yogamariemills/YogaThurles/",
          route: "YogaThurles/WhatToBring",
          component: "yogaWTBPage"
        },
        {
          id: 3,
          name: "ClassTypes",
          href: "http://www.yogamariemills/YogaThurles/",
          route: "YogaThurles/ClassTypes",
          component: "ClassTypesPage"
        },
        {
          id: 4,
          name: "Schedule",
          href: "http://www.yogamariemills/YogaThurles/",
          route: "YogaThurles/Schedule",
          component: "SchedulePage"
        }
    ]    
  },
  {
    id: 3,
    name: "Contemporary Ayurveda",
    href: "http://wwww.yogamariemills/Contemporary/",
    route: "contemporary",
    component: "ContemporaryPage",
    subMenu: [
        {
          id: 1,
          name: "Ayurvedic Diet Consultation",
          href: "http://www.yogamariemills/Contemporary/",
          route: "Ayurveda/DietConsultation",
          component: "contemporaryDietPage"
        },
        {
          id: 2,
          name: "Ayurvedic Body Massage Treatments",
          href: "http://www.yogamariemills/Contemporary/",
          route: "Ayurveda/Massage/Body",
          component: "contemporaryMassagePage"
        },
        {
          id: 3,
          name: "Head, Hands, Feet or Abdominal Massage",
          href: "http://www.yogamariemills/Contemporary/",
          route: "Ayurveda/Massage/HeadHandsFeetAb",
          component: "contemporaryMassagePage"
        },
        {
          id: 4,
          name: "Ayurveda Testimonials",
          href: "http://www.yogamariemills/Contemporary/",
          route: "Ayurveda/Testimonials",
          component: "contemporaryTestimonialsPage"
        }
    ]  
  },
  {
    id: 4,
    name: "My Blog",
    href: "http://www.yogamariemills/Blog/",
    route: "blogs",
    component: "BlogPage"  
  },
  {
    id: 5,
    name: "Events",
    href: "http://www.yogamariemills/Shop/",
    route: "events",
    component: "EventsPage"  
  }
];

class NavbarApi {
    static getAllItems() {
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], navbar_items));
        });
    }
}

  export default NavbarApi;
