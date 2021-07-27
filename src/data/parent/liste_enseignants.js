import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
const enseignants = [
  {
    id: 1,
    nom: "nom prenom",
    img: "/assets/img/goose-breast-thumb.jpg",
    adr: "adresse",
    dns: "dns",
    pass: "password",
    statusColor: "secondary",
    user: "username",
    tel: 78965412,
    cin: 41124578,
    dns: "1x",
    btn: (
      <div>
        <Button color="info" className="mb-2">
          Modifier
        </Button>
        &nbsp;{" "}
        <Button color="danger" className="mb-2">
          Supprimer
        </Button>
      </div>
    )
  },

  {
    id: 2,
    nom: "Fat Rascal",
    adr: "Cupcakes",
    img: "/assets/img/fat-rascal-thumb.jpg",
    dns: "01.04.2018",
    pass: "PROCESSED",
    statusColor: "secondary",
    user: "Cheesecake with chocolate cookies and Cream biscuits",
    tel: 1240,
    cin: 48,
    dns: "1x",

    btn: (
      <div>
        <Button color="info" className="mb-2">
          Modifier
        </Button>
        &nbsp;{" "}
        <Button color="danger" className="mb-2">
          Supprimer
        </Button>
      </div>
    )
  },
  {
    id: 3,
    nom: "Chocolate Cake",
    img: "/assets/img/chocolate-cake-thumb.jpg",
    adr: "Cakes",
    dns: "25.03.2018",
    pass: "PROCESSED",
    statusColor: "secondary",
    user: "Homemade cheesecake with fresh berries and mint",
    tel: 1080,
    cin: 57,
    dns: "1x",

    btn: (
      <div>
        <Button color="info" className="mb-2">
          Modifier
        </Button>
        &nbsp;{" "}
        <Button color="danger" className="mb-2">
          Supprimer
        </Button>
      </div>
    )
  }
];
export default enseignants;
