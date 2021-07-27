const data = [
  {
    id: "Accueil",
    icon: "simple-icon-home",
    label: "Accueil",
    to: "/ecole/accueil"
  },

  {
    id: "Gestion",
    icon: "iconsminds-the-white-house",
    label: "Gestion école",
    to: "/ecole/gst_ecole",
    role: "ROLE_GESTION_ECOLE",
    subs: [
      {
        icon: "iconsminds-management",
        label: "Classes",
        // role: "ROLE_GESTION_CLASSE",
        to: "/ecole/gst_ecole/gst_classe"
      },
      {
        icon: "iconsminds-student-male-female",
        label: "Élèves",
        to: "/ecole/gst_ecole/gst_eleve"
      },
      {
        icon: "iconsminds-business-man-woman",
        label: "Enseignants",
        to: "/ecole/gst_ecole/gst_ens"
      },
      {
        icon: "iconsminds-male-female",
        label: "Tuteurs",
        to: "/ecole/gst_ecole/gst_tuteur"
      },
      {
        icon: "iconsminds-books",
        label: "Domaines",
        to: "/ecole/gst_ecole/gst_domaine"
      },
      {
        icon: "iconsminds-notepad",
        label: "Matiéres",
        to: "/ecole/gst_ecole/gst_matieres"
      },
      {
        icon: "iconsminds-check",
        label: "Absences",
        to: "/ecole/gst_ecole/gst_absence"
      },


    ]
  },
  {
    id: "Adminstrateur",
    icon: "simple-icon-user",
    label: "Gestion des administrateurs",
    role: "ROLE_GESTION_ADMINISTRATEUR",
    to: "/ecole/gst_admins"
  },
  {
    id: "Emplois",
    icon: "simple-icon-calendar",
    label: "Emplois du temps",
    role: "ROLE_EMPLOI",
    to: "/ecole/gst_emplois",
    subs: [
      {
        icon: "iconsminds-calendar-1",
        label: "Emplois des classes",
        to: "/ecole/gst_emplois/emploi_eleve"
      },
      {
        icon: "iconsminds-calendar-1",
        label: "Emplois des enseignants",
        to: "/ecole/gst_emplois/emploi_ens"
      }
    ]
  },

  {
    id: "Notes",
    icon: "simple-icon-note",
    label: "Carnets de notes",
    role: "ROLE_NOTES",
    to: "/ecole/notes",
  },

  {
    id: "cexam",
    icon: "simple-icon-calendar",
    label: "Calendriers des examens",
    role: "ROLE_CALENDRIER_EXAMENS",
    to: "/ecole/calendrier_examens",
  },
  {
    id: "Organisations",
    icon: "simple-icon-event",
    label: "Organisations",
    role: "ROLE_ORGANISATION",
    to: "/ecole/organiser",

    subs: [
      {
        icon: "iconsminds-calendar-4",
        label: "Évènements",
        to: "/ecole/organiser/evenement"
      },
      {
        icon: "iconsminds-hamburger",
        label: "Cantine",
        to: "/ecole/organiser/cantine"
      },
      {
        icon: "iconsminds-bus-2",
        label: "Gestion de transport",
        to: "/ecole/organiser/bus"
      }
    ]
  },
  {
    id: "Année scolaire",
    icon: "iconsminds-mens",
    label: "Année scolaire",
    to: "/ecole/annee",
    role: "ROLE_GESTION_ADMINISTRATEUR",

  },



];
export default data;




