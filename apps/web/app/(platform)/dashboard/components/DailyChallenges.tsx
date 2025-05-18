import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Award, ChevronRight, Crown, Rocket, Trophy } from "lucide-react";

export function DailyChallenges() {
  return (
    <Card className="w-full md:w-1/3 card-highlight h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Trophy className="h-5 w-5 text-secondary mr-2" />
          Daily Challenges
        </CardTitle>
        <CardDescription className="text-neutral-gray">
          Complete to earn extra stars!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4 h-full flex flex-col">
          <ChallengeItem
            icon={Award}
            title="Solve 5 Fraction Problems"
            progress="3/5 completed"
            status="active"
            color="success"
          />
          <ChallengeItem
            icon={Rocket}
            title="Complete Geometry Quiz"
            progress="Earn 50 stars"
            color="primary"
          />
          <ChallengeItem
            icon={Crown}
            title="Win Math Battle Game"
            progress="Earn 100 stars"
            color="secondary"
          />
        </div>
      </CardContent>
    </Card>
  );
}

type ChallengeItemProps = {
  icon: any;
  title: string;
  progress: string;
  status?: "active";
  color: string;
};

function ChallengeItem({ icon: Icon, title, progress, status, color }: ChallengeItemProps) {
  const isActive = status === "active";
  
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${
      isActive ? `bg-${color}/10` : "bg-white"
    } border ${isActive ? `border-${color}/20` : "border-gray-200"}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-${color}/20`}>
        <Icon className={`h-5 w-5 text-${color}`} />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-neutral-gray">{progress}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full hover:bg-${color}/10`}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
