import { useCharacterContext } from "@/components/CharacterContextProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pc/character-sheet")({
  component: CharacterSheet,
});

function CharacterSheet() {
  return (
    <div className="flex-coll flex h-full w-full gap-2 bg-secondary/30 p-2">
      <img src="" alt="" />
      <div className="flex h-fit w-full gap-2">
        <div className="flex w-1/2 flex-col">
          <h1 className="h-full w-full font-mono text-xl font-bold tracking-wide">
            Dungeons & Dragons
          </h1>

          <CharacterName />
        </div>
        <BasicInfoContainer />
      </div>
    </div>
  );
}

const CharacterName = ({}: {}) => {
  const {
    characterSheetInfo: { name, tagline },
  } = useCharacterContext();
  return (
    <Card className="h-fit w-full self-center">
      <CardHeader className="p-3">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="italic">{tagline}</CardDescription>
      </CardHeader>
      <CardFooter className="flex w-full justify-end p-1 text-xs text-muted-foreground">
        Character name
      </CardFooter>
    </Card>
  );
};

const BasicInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  const {} = useCharacterContext();
  return (
    <Card className="w-full border-none">
      <CardHeader className="p-2">
        <CardTitle className="text-sm">{value}</CardTitle>
        <hr className="border-primary-foreground" />
        <CardDescription
          className="m-0 text-xs"
          // seems wrong that I have to do this...
          style={{ marginBlockStart: ".25em" }}
        >
          {label.toUpperCase()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const BasicInfoContainer = ({}: {}) => {
  const {
    characterSheetInfo: {
      basicInfo: { alignment, background, classType, exp, level, player, race },
    },
  } = useCharacterContext();
  return (
    <Card className="w-1/2 p-0">
      <CardContent className="flex flex-col overflow-x-auto whitespace-nowrap p-2">
        <div className="flex">
          <BasicInfoItem
            label={"Class & Lvl"}
            value={classType + " " + "(" + level + ")"}
          />
          <BasicInfoItem label={"Background"} value={background} />
          <BasicInfoItem label={"Player"} value={player} />
        </div>
        <div className="flex">
          <BasicInfoItem label={"Race"} value={race} />
          <BasicInfoItem label={"Alignment"} value={alignment} />
          <BasicInfoItem label={"Exp"} value={exp} />
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-end p-1 text-xs text-muted-foreground">
        Basic info
      </CardFooter>
    </Card>
  );
};

const AbilityItem = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const AbilityContainer = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const Inspiration = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const ProficiencyBonus = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const SavingThrows = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const Skills = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const PassiveWidsom = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const OtherProficiencies = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const ArmorClass = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

// I feel like this doesn't need to be on the sheet
// const Initiative = ({}: {}) => {
//   //
//   return (
//     <div></div>
//   )
// }

const Speed = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const HitPoints = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const HitDice = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const DeathSaves = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const Attacks = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const Equipment = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const OtherCharacterInfoItem = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const OtherCharacterInfoContainer = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};

const FeaturesTraits = ({}: {}) => {
  const {} = useCharacterContext();
  return <div></div>;
};
