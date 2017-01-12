const dietConsultations = [
  {
    id: 1,
    consultation_header: "Ayurvedic Diet Consultation",
    description: "Learning about your personal body type, your diet and lifestyle. And how to improve your overall health with and Ayurvedic Diet",
    route: "about",
    consultation_details: [
      {
        id: 1,
        session_time: "60 - 90 Minutes",
        consultation: "Dietary Consultation involving Ayurveda",
        details: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        cost: "€70",
      },
      {
        id: 2,
        session_time: "50 Minutes",
        consultation: "Maintenance Consultation and further information",
        details: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        cost: "€25",
      }
    ]
  }
];

class DietConsultationApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      resolve(Object.assign([], dietConsultations));
    });
  }
}

export default DietConsultationApi;
