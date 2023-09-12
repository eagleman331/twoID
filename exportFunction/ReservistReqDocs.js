import React from "react";
import { useNavigation } from "@react-navigation/native";
//Data
import { PushUpData } from "../assets/DataSlides/PftSlidesFAQs/Push-UpFAQs";
import { RunningData } from "../assets/DataSlides/PftSlidesFAQs/RunningFAQs";
import { SitUpData } from "../assets/DataSlides/PftSlidesFAQs/SitUpFAQs";


import { ROTC } from "../assets/References/ReservistReqDocs/AdvanceROTCProgram";
import { BCMT } from "../assets/References/ReservistReqDocs/BCMT";
import { CommissionedReserveOfficers } from "../assets/References/ReservistReqDocs/CommissionReserveForce";

export const navigateToPftViewer = (item, navigation) => {
  const core = item.core;
  if (core == "Push-Up") {
    navigation.navigate("PftViewer", { PftData: PushUpData });
  } else if (core == "Sit-Up") {
    navigation.navigate("PftViewer", { PftData: SitUpData });
  } else if (core == "Running") {
    navigation.navigate("PftViewer", { PftData: RunningData });
  }
};

export const NavigateReservistReqDocs = (item, navigation) => {
  const core = item.core;
  if (core == "ROTC") {
    navigation.navigate("ReservistReqDocs", { itemData: ROTC });
  } else if (core == "BCMT") {
    navigation.navigate("ReservistReqDocs", { itemData: BCMT });
  } else if (core == "Commission-Reserve-Force") {
    navigation.navigate("ReservistReqDocs", { itemData: CommissionedReserveOfficers });
  }

};
