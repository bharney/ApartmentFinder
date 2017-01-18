const testimonials = [
  {
    id: 1,
    header: "Ayurvedic Testimonials",
    description: "I tend to take with a pinch of salt, however, all Ayurveda testimonials and testimonials Yoga on this site are from the original author/student, client.",
    route: "Aryuveda/Testimonials",
    details: `I once lived in Bandon, Co. Cork, now relocated to the lovely town of Thurles, Co. Tipperary, so that West Cork reference appears at times.
              I am now at the early stages of opening my doors of Ayurveda consultation, Ayurveda treatment and Ayurveda massage in Thurles, at the Health Shop, Baker Street, Thurles and also the Angel shop, Baker street, Thurles.
              Ripples are created by movement of energy, in everything we do, we create movement. Even in stillness, there is movement; from others moving towards us, or away from us. 
              I hope all I do creates/encourages/cultivates vibration of interconnection, non-judgement and a hint of a smile.`,
    quotes: [
      {
        id: 1,
        detail: "I have been attending Marie’s yoga classes in Bandon for a couple of years now and I think they are excellent. They are suitable for beginners as well as advanced students , as Marie allows you to go at your own pace depending on how you are feeling that day. I always feel very safe under Marie’s instruction and her classes are great fun. I also received several massage treatment’ s from Marie for a lower back complaint and I would recommend her to anyone.",
        name: "Alexandra Sexton , Macroom."
      },
      {
        id: 2,
        detail: "I find a full body massage from Marie is a wonderful way to switch off from the woe’s and worries of the outside world. I always leave with my spirit lifted and yet relaxed. I recommend it highly as a great way to destress.",
        name: "Mairéadaine"
      },
      {
        id: 3,
        detail: "This is what a massage is meant to feel like. Relaxing and Re-energising. As for the yoga practice, I’ve been going for over three years and would never dream of having another guide. Marie is Fabulous.",
        name: "M. Cotter"
      },
      {
        id: 3,
        detail: "Facials with Marie are worth every second of your time. Each minute is so relaxing and refreshing. Marie is gifted and calming to be around and I would recommend that everyone takes time to experience a facial with Marie.",
        name: "Deirdre Wilmot"
      }
    ]
  }
];

class TestimonialApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      resolve(Object.assign([], testimonials));
    });
  }
}

export default TestimonialApi;
