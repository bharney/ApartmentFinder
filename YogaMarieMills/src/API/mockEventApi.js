const eventTypes = [
  {
    id: 1,
    type: "Bandon",
    consultation_header: "Yoga Events in Bandon, Co. Cork",
    description: "Christmas Yoga in Bandon, Co. Cork",
    route: "Events",
    venue: "Bandon Naionra, Bandon GAA pavillion, Co. Cork.",
    consultation_details: [
      {
        id: 1,
        session_time: "10 AM to 12 PM",
        consultation: "Christmas Yoga in Bandon, Co. Cork",
        details: "Join Marie in building inner peace, silence and calm at the biggest season of parties, tiredness and mental fatigue. Learn small ways to bring about silence and find the calm in your mind with the wisdom of Ayurveda and Yoga. Yoga at Christmas with Marie Mills is a small break from the whirlwind of  ‘doing and preparing’ that we all wake up to a few Sunday before Christmas day.",
        cost: "€25",
        consultation_specifics: [
          {
            id: 1,
            detail: "Your own bottle of water. A blanket and a Yoga mat and a bolster if possible.",
          },
          {
            id: 2,
            detail: "You can borrow a mat from Marie on request.",
          }
        ]
      }
    ],
  },
  {
    id: 2,
    type: "Thurles",
    consultation_header: "Yoga Events in Thurles",
    description: "Yoga workshop for sport and flexibility",
    route: "Events",
    venue: "Order of Malta hall,  Boheravroon, Thurles",
    consultation_details: [
      {
        id: 1,
        session_time: "10 AM to 12 PM",
        consultation: "Christmas Yoga in Bandon, Co. Cork",
        details: "If you are actively partaking in sports of any kind, have you ever wondered how Yoga can help you go beyond your current limits? This two hour Dynamic Yoga Thurles workshop is enough time to challenge your body and mind on the strengthening and freeing practice of Yoga.",
        cost: "€25",
        consultation_specifics: [
          {
            id: 1,
            detail: "Your own bottle of water. A blanket and a Yoga mat and a bolster if possible.",
          },
          {
            id: 2,
            detail: "You can borrow a mat from Marie on request.",
          }
        ]
      }
    ],
  },
  {
    id: 3,
    type: "Holiday",
    consultation_header: "Holiday Yoga Events",
    description: "Yoga workshop the Holiday Season",
    route: "Events",
    venue: "",
    consultation_details: [
      {
        id: 1,
        session_time: "10 AM to 12 PM",
        consultation: "Christmas Yoga",
        details: "If you are actively partaking in sports of any kind, have you ever wondered how Yoga can help you go beyond your current limits? This two hour Dynamic Yoga Thurles workshop is enough time to challenge your body and mind on the strengthening and freeing practice of Yoga.",
        cost: "€25",
        consultation_specifics: [
          {
            id: 1,
            detail: "Your own bottle of water. A blanket and a Yoga mat and a bolster if possible.",
          },
          {
            id: 2,
            detail: "You can borrow a mat from Marie on request.",
          }
        ]
      }
    ],
  }
];

class EventApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/events').then(function (response) {
        return response.json();
      }).then(function (consultations) {
        
        resolve(Object.assign([], consultations));
      });
    });
  }
}

export default EventApi;
