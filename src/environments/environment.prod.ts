export const environment = {
  production: true,
  host:'https://gym-auth-backend1.herokuapp.com/',
  prefijoUrlImagenes: '/assets/',
  prefijoUrlEjercicios: '/imgejercicio/',
  app: "GymUp",
  empresas : new Map([
    ["prod", "https://gym-backend1.herokuapp.com/"],
    ["gimnasioolimpia", "https://gimnasioolimpia-backend.herokuapp.com/"],
    ["migueltraining", "https://migueltraining-backend.herokuapp.com/"],
  ])
};
