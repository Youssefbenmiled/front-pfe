/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const levels = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

export const notifs = [
  { label: "Toutes les notifications", value: "*" },
  { label: "Calendriers des examens", value: "calendriers" },
  { label: "Emplois du temps", value: "cmplois" },
  { label: "Carnets de notes", value: "notes" },
  { label: "Absences", value: "absences" },
  { label: "Travaux à faire", value: "travaux" },
  { label: "Dates d'évaluation", value: "evaluations" },
  { label: "Cantine", value: "cantine" },
  { label: "Évènements", value: "evenements" },
  { label: "Transport", value: "transport" },

];


export const levelsmat = [
  { label: "Toutes les matiéres (Tous les domaines)", value: "*", niveau: "*" },
  { label: "Domaines 1ére année", value: "1", niveau: "1ére année" },
  { label: "Domaines 2éme année", value: "2", niveau: "2ére année" },
  { label: "Domaines 3éme année", value: "3", niveau: "3ére année" },
  { label: "Domaines 4éme année", value: "4", niveau: "4ére année" },
  { label: "Domaines 5éme année", value: "5", niveau: "5ére année" },
  { label: "Domaines 6éme année", value: "6", niveau: "6ére année" },
];

export const levelsdm = [
  { label: "Tous les domaines", value: "*" },
  { label: "1ére année", value: "1" },
  { label: "2éme année", value: "2" },
  { label: "3éme année", value: "3" },
  { label: "4éme année", value: "4" },
  { label: "5éme année", value: "5" },
  { label: "6éme année", value: "6" },
];
export const levelstuteur = [
  { label: "Tous les tuteurs", value: "*" },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
  { label: "Non affectés", value: "!" },

];
export const levelscal = [
  { label: "Tous les calendriers des examens", value: "*" },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
];
export const empcls = [
  { label: "Tous les emplois", value: "*" },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
];
export const levelscls = [
  { label: "Toutes les classes", value: "*" },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
];
export const levelselv = [
  { label: "Tous les éléves", value: "*" },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
  { label: "Non affectés", value: "!" },
];
export const levelsens = [
  { label: "Tous les enseignants", value: -1 },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
  { label: "Non affectés", value: "!" },

];
export const levelsappels = [
  { label: "Tous les niveaux", value: -1 },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
];
export const levelscarnet = [
  { label: "Tous les carnets de notes", value: "*" },
  { label: "1ére année", value: 1 },
  { label: "2éme année", value: 2 },
  { label: "3éme année", value: 3 },
  { label: "4éme année", value: 4 },
  { label: "5éme année", value: 5 },
  { label: "6éme année", value: 6 },
];

export const roles = [
  { label: "ROLE_GESTION_ECOLE", value: "ROLE_GESTION_ECOLE" },
  // { label: "ROLE_GESTION_ADMINISTRATEUR", value: "ROLE_GESTION_ADMINISTRATEUR" },
  // { label: "ROLE_GESTION_ENSEIGNANT", value: "ROLE_GESTION_ENSEIGNANT" },
  // { label: "ROLE_GESTION_TUTEUR", value: "ROLE_GESTION_TUTEUR" },
  // { label: "ROLE_GESTION_DOMAINE", value: "ROLE_GESTION_DOMAINE" },
  // { label: "ROLE_GESTION_MATIERE", value: "ROLE_GESTION_MATIERE" },
  { label: "ROLE_EMPLOI", value: "ROLE_EMPLOI" },
  { label: "ROLE_NOTES", value: "ROLE_NOTES" },
  { label: "ROLE_CALENDRIER_EXAMENS", value: "ROLE_CALENDRIER_EXAMENS" },
  { label: "ROLE_ORGANISATION", value: "ROLE_ORGANISATION" },

];
export const options = [
  { label: "TOUS LES ADMINISTRATEURS", value: "*" },
  { label: "ROLE_SUPER_ADMINISTRATEUR", value: "ROLE_SUPER_ADMINISTRATEUR" },
  { label: "ROLE_GESTION_ECOLE", value: "ROLE_GESTION_ECOLE" },
  // { label: "ROLE_GESTION_ADMINISTRATEUR", value: "ROLE_GESTION_ADMINISTRATEUR" },
  // { label: "ROLE_GESTION_ENSEIGNANT", value: "ROLE_GESTION_ENSEIGNANT" },
  // { label: "ROLE_GESTION_TUTEUR", value: "ROLE_GESTION_TUTEUR" },
  // { label: "ROLE_GESTION_DOMAINE", value: "ROLE_GESTION_DOMAINE" },
  // { label: "ROLE_GESTION_MATIERE", value: "ROLE_GESTION_MATIERE" },
  { label: "ROLE_EMPLOI", value: "ROLE_EMPLOI" },
  { label: "ROLE_NOTES", value: "ROLE_NOTES" },
  { label: "ROLE_CALENDRIER_EXAMENS", value: "ROLE_CALENDRIER_EXAMENS" },
  { label: "ROLE_ORGANISATION", value: "ROLE_ORGANISATION" },

];
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
  authDomain: "gogo-react-login.firebaseapp.com",
  databaseURL: "https://gogo-react-login.firebaseio.com",
  projectId: "gogo-react-login",
  storageBucket: "gogo-react-login.appspot.com",
  messagingSenderId: "216495999563"
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = true;
export const defaultColor = "light.purple";
export const defaultDirection = "ltr";
export const isDarkSwitchActive = true;
export const themeColorStorageKey = "__theme_color";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = false;


