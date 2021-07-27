const data = [
  {
    id: "Accueil",
    icon: "simple-icon-home",
    label: "Accueil",
    to: "/parent/accueil"
  },
  {
    id: "ens",
    icon: "iconsminds-open-book",
    label: "Enseignement",
    to: "/parent/ens",
    subs: [


      {
        icon: "iconsminds-check",
        label: "Absence",
        to: "/parent/ens/absence"
      },
      {
        icon: "iconsminds-notepad",
        label: "Travail à faire",
        to: "/parent/ens/devoirs"
      },
      {
        icon: "iconsminds-calendar-1",
        label: "Date d'évaluation",
        to: "/parent/ens/evaluation"
      },


    ]
  },
  {
    id: "admin",
    icon: "iconsminds-office",
    label: "Administration",
    to: "/parent/consultation",
    subs: [
      {
        icon: "iconsminds-calendar-1",
        label: "Emploi du temps",
        to: "/parent/administration/emploi"
      },
      {
        icon: "iconsminds-calendar-1",
        label: "Calendrier des examens",
        to: "/parent/administration/calendrier"
      },
      {
        icon: "iconsminds-diploma-2",
        label: "Carnet de notes",
        to: "/parent/administration/notes"
      },
    ]
  },

  {
    id: "horaires",
    icon: "simple-icon-clock",
    label: "Horaires",
    to: "/parent/horaires",
    subs: [
      {
        icon: "iconsminds-bus-2",
        label: "Transport",
        to: "/parent/horaires/bus"
      },
      {
        icon: "iconsminds-hamburger",
        label: "Cantine",
        to: "/parent/horaires/cantine"
      }
    ]
  },
  {
    id: "evenement",
    icon: "iconsminds-calendar-4",
    label: "Évènements",
    to: "/parent/evenements/evenement"
  },
  {
    id: "chat",
    icon: "iconsminds-speach-bubble d-block",
    label: "Messagerie",
    to: "/parent/chat/messagerie"
  },
  {
    id: "Notifications",
    icon: "iconsminds-bell",
    label: "Notifications",
    to: "/parent/notifs/notifications"
  },
];
export default data;
