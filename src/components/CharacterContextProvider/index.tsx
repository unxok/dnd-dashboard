import { useContext, ReactNode, useState, createContext } from "react";

export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type SkillName =
  | "acrobatics"
  | "animal handling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleight of hand"
  | "stealth"
  | "survival";

export type CharacterSheetInfo = {
  name: string;
  tagline: string;
  abilities: {
    ability: AbilityName;
    score: number;
    modifier: number; // calculated
    /**
     * To track changes to scores for things like class bonuses
     */
    notes: string;
  }[];
  savingThrows: {
    ability: AbilityName;
    score: number; // calculated
    isProficient: boolean;
    notes: string;
  }[];
  skills: {
    skill: SkillName;
    score: number; // calculated
    isProficient: boolean;
    notes: string;
  }[];
  basicInfo: {
    classType: string;
    level: number;
    background: string;
    player: string;
    race: string;
    alignment: string;
    exp: number;
    notes: string;
  };
  otherInfo: {
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
  };
  featuresTraits: {
    title: string;
    description: string;
    notes: string;
  }[];
  inspiration: { amount: number; notes: string };
  proficiencyBonus: number; // calculated
  armorClass: {
    score: number;
    notes: string;
  };
  speed: {
    feet: number;
    notes: string;
  };
  hitPoints: {
    max: number;
    current: number;
    temporary: number;
    notes: string;
  };
  hitDice: {
    diceType: number;
  };
  deathSaves: {
    successes: [boolean, boolean, boolean];
    failures: [boolean, boolean, boolean];
  };
  attacks: {
    name: string;
    attackBonus: number;
    /**
     * Doing this properly is more complex then I feel is worth it at this time, so it's just a string.
     */
    damage: {
      string: number;
      notes: string;
    };
  }[];
  equipment: {
    money: {
      copper: number;
      silver: number;
      electrum: number;
      gold: number;
      platinum: number;
    };
    items: {
      name: string;
      count: number;
      notes: string;
    }[];
  };
  otherProficiencies: {
    name: string;
    notes: string;
  }[];
};

export const defaultCharacterSheet: CharacterSheetInfo = {
  name: "Unxok Yuqzuilx",
  tagline: "the spiteful",
  abilities: [
    { ability: "str", score: 10, modifier: 0, notes: "" },
    { ability: "dex", score: 10, modifier: 0, notes: "" },
    { ability: "con", score: 10, modifier: 0, notes: "" },
    { ability: "int", score: 10, modifier: 0, notes: "" },
    { ability: "wis", score: 10, modifier: 0, notes: "" },
    { ability: "cha", score: 10, modifier: 0, notes: "" },
  ],
  savingThrows: [
    { ability: "str", score: 0, isProficient: false, notes: "" },
    { ability: "dex", score: 0, isProficient: false, notes: "" },
    { ability: "con", score: 0, isProficient: false, notes: "" },
    { ability: "int", score: 0, isProficient: false, notes: "" },
    { ability: "wis", score: 0, isProficient: false, notes: "" },
    { ability: "cha", score: 0, isProficient: false, notes: "" },
  ],
  skills: [
    { skill: "acrobatics", score: 0, isProficient: false, notes: "" },
    { skill: "animal handling", score: 0, isProficient: false, notes: "" },
    { skill: "arcana", score: 0, isProficient: false, notes: "" },
    { skill: "athletics", score: 0, isProficient: false, notes: "" },
    { skill: "deception", score: 0, isProficient: false, notes: "" },
    { skill: "history", score: 0, isProficient: false, notes: "" },
    { skill: "insight", score: 0, isProficient: false, notes: "" },
    { skill: "intimidation", score: 0, isProficient: false, notes: "" },
    { skill: "investigation", score: 0, isProficient: false, notes: "" },
    { skill: "medicine", score: 0, isProficient: false, notes: "" },
    { skill: "nature", score: 0, isProficient: false, notes: "" },
    { skill: "perception", score: 0, isProficient: false, notes: "" },
    { skill: "performance", score: 0, isProficient: false, notes: "" },
    { skill: "persuasion", score: 0, isProficient: false, notes: "" },
    { skill: "religion", score: 0, isProficient: false, notes: "" },
    { skill: "sleight of hand", score: 0, isProficient: false, notes: "" },
    { skill: "stealth", score: 0, isProficient: false, notes: "" },
    { skill: "survival", score: 0, isProficient: false, notes: "" },
  ],
  basicInfo: {
    classType: "Wizard",
    level: 1,
    background: "Charlatan",
    player: "Ander",
    race: "Githyanki",
    alignment: "Neutral-evil",
    exp: 0,
    notes: "",
  },
  otherInfo: {
    personalityTraits: "",
    ideals: "",
    bonds: "",
    flaws: "",
  },
  featuresTraits: [{ title: "", description: "", notes: "" }],
  inspiration: {
    amount: 0,
    notes: "",
  },
  proficiencyBonus: 0,
  armorClass: {
    score: 10,
    notes: "",
  },
  speed: {
    feet: 30,
    notes: "",
  },
  hitPoints: {
    max: 0,
    current: 0,
    temporary: 0,
    notes: "",
  },
  hitDice: {
    diceType: 0,
  },
  deathSaves: {
    successes: [false, false, false],
    failures: [false, false, false],
  },
  attacks: [{ name: "", attackBonus: 0, damage: { string: 0, notes: "" } }],
  equipment: {
    money: {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    },
    items: [{ name: "", count: 1, notes: "" }],
  },
  otherProficiencies: [{ name: "", notes: "" }],
};

export const getFormattedAbility = (
  ability: AbilityName,
  format: "regular" | "lower" | "upper",
) => {
  const regular = (() => {
    switch (ability) {
      case "str":
        return "Strength";
      case "dex":
        return "Dexterity";
      case "con":
        return "Constitution";
      case "int":
        return "Intelligence";
      case "wis":
        return "Wisdom";
      case "cha":
        return "Charisma";
      default:
        return "ERROR";
    }
  })();
  if (format === "regular") return regular;
  if (format === "lower") return regular.toLowerCase();
  return regular.toUpperCase();
};

const getAbilityForSkill = (skill: SkillName): AbilityName => {
  switch (skill) {
    case "acrobatics":
    case "sleight of hand":
    case "stealth":
      return "dex";
    case "athletics":
      return "str";
    case "arcana":
    case "history":
    case "investigation":
    case "nature":
    case "religion":
      return "int";
    case "animal handling":
    case "insight":
    case "medicine":
    case "perception":
    case "survival":
      return "wis";
    case "deception":
    case "intimidation":
    case "performance":
    case "persuasion":
      return "cha";
    default:
      return "str"; // Fallback to strength if something goes wrong
  }
};

export const calculateCharacterSheet = (
  sheet: CharacterSheetInfo,
): CharacterSheetInfo => {
  // Helper function to calculate modifier from ability score
  const calculateModifier = (score: number): number =>
    Math.floor((score - 10) / 2);

  // Update proficiency bonus first
  const updatedProficiencyBonus = Math.floor((sheet.basicInfo.level + 7) / 4);

  // Calculate ability modifiers
  const updatedAbilities = sheet.abilities.map((ability) => ({
    ...ability,
    modifier: calculateModifier(ability.score),
  }));

  // Calculate saving throw scores (ability modifier + proficiency bonus if proficient)
  const updatedSavingThrows = sheet.savingThrows.map((save) => ({
    ...save,
    score:
      calculateModifier(
        sheet.abilities.find((ability) => ability.ability === save.ability)
          ?.score || 0,
      ) + (save.isProficient ? updatedProficiencyBonus : 0),
  }));

  // Calculate skill scores (ability modifier + proficiency bonus if proficient)
  const abilityModifierMap = Object.fromEntries(
    updatedAbilities.map(({ ability, modifier }) => [
      ability as AbilityName,
      modifier,
    ]),
  ) as { [key in AbilityName]: number };

  const updatedSkills = sheet.skills.map((skill) => ({
    ...skill,
    score:
      abilityModifierMap[getAbilityForSkill(skill.skill)] +
      (skill.isProficient ? updatedProficiencyBonus : 0),
  }));

  // Create a modified copy of the original sheet with calculated fields
  return {
    ...sheet,
    abilities: updatedAbilities,
    savingThrows: updatedSavingThrows,
    skills: updatedSkills,
    proficiencyBonus: updatedProficiencyBonus,
  };
};

type CharacterContextState = {
  characterSheetInfo: CharacterSheetInfo;
  setCharacterSheetInfo: (info: CharacterSheetInfo) => void;
};

const defaultCharacterContextState: CharacterContextState = {
  characterSheetInfo: defaultCharacterSheet,
  setCharacterSheetInfo: () => {},
};

const CharacterContext = createContext<CharacterContextState>(
  defaultCharacterContextState,
);

export const useCharacterContext = () => {
  const ctx = useContext(CharacterContext);

  if (!ctx) {
    throw new Error(
      "`useCharacterContext` must be used within a `CharacterContextProvider`",
    );
  }

  return ctx;
};

export const CharacterContextProvider = ({
  children,
  defaultInfo,
}: {
  children: ReactNode;
  defaultInfo: CharacterSheetInfo;
}) => {
  const [characterSheetInfo, setCharacterSheetInfo] = useState(defaultInfo);

  return (
    <CharacterContext.Provider
      value={{ characterSheetInfo, setCharacterSheetInfo }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
