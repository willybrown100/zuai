import useStore from "@/store";
import CriteriaItem from "./CriteriaItem";
import { useState } from "react";

interface criterion {
  title: string;
  heading: string;
  essay: string;
  criteria: number | undefined;
  strenghtText1: string;
  strenghtText2: string;
}

export function CriteriaComponent() {
  const {
    criteriaA,
    criteriaB,
    criteriaC,
    setCriteriaA,
    setCriteriaB,
    setCriteriaC,
  } = useStore();
  const [curOpen, setCurOpen] = useState(null);
  const criterias: criterion[] = [
    {
      title: "criteria A",
      heading: "Understanding Knowledge Questions",
      essay:
        "The essay identifies and focuses on the knowledge question regarding the resolvaility of disputes over knowledge claims within disciplines.",
      strenghtText1:
        "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
      strenghtText2:
        "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.",
      criteria: criteriaA,
    },
    {
      title: "criteria B",
      heading: "Understanding Knowledge Questions",
      essay:
        "The essay identifies and focuses on the knowledge question regarding the resolvaility of disputes over knowledge claims within disciplines.",
      strenghtText1:
        "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
      strenghtText2:
        "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.",
      criteria: criteriaB,
    },
    {
      title: "criteria C",
      heading: "Understanding Knowledge Questions",
      essay:
        "The essay identifies and focuses on the knowledge question regarding the resolvaility of disputes over knowledge claims within disciplines.",
      strenghtText1:
        "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
      strenghtText2:
        "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.",
      criteria: criteriaC,
    },
  ];
  return (
    <div>
      {criterias.map((item, i) => (
        <CriteriaItem
          curOpen={curOpen}
          num={i}
          onOpen={setCurOpen}
          key={item.title}
          item={item}
        />
      ))}
    </div>
  );
}
