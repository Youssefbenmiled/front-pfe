const data = [
  {
    id: "accueil",
    icon: "simple-icon-home",
    label: "Accueil",
    to: "/enseignant/accueil"
  },
  {
    id: "classes ",
    icon: "iconsminds-open-book",
    label: "Enseignement",
    to: "/enseignant/gst_classes",
    subs: [

      {
        id: "appels",
        icon: "iconsminds-testimonal",
        label: "Feuille d'appel",
        to: "/enseignant/gst_classes/gst_absences"
      },
      {
        id: "devoirs",
        icon: "iconsminds-notepad",
        label: "Travail à faire",
        to: "/enseignant/gst_classes/devoirs"
      },
      {
        id: "datev",
        icon: "iconsminds-calendar-1",
        label: "Date d'évaluation",
        to: "/enseignant/gst_classes/evaluations_tests"
      },
    ]
  },
  {
    id: "admin",
    icon: "iconsminds-office",
    label: "Administration",
    to: "/enseignant/administration",
    subs: [
      {
        icon: "iconsminds-calendar-1",
        label: "Emploi du temps",
        to: "/enseignant/administration/emploi"
      },
      {
        icon: "iconsminds-calendar-1",
        label: "Calendrier des examens",
        to: "/enseignant/administration/calendrier"
      },

    ]
  },
  {
    id: "Evenements",
    icon: "iconsminds-calendar-4",
    label: "Évènements",
    to: "/enseignant/evenements/event",
  },
  {
    id: "Messagerie",
    icon: "iconsminds-speach-bubble d-block",
    label: "Messagerie",
    to: "/enseignant/gst_chat"
  },
  // {
  //   id: "Notifications",
  //   icon: "iconsminds-bell",
  //   label: "Notifications",
  //   to: "/enseignant/notifs/notifications"
  // },
];
export default data;
