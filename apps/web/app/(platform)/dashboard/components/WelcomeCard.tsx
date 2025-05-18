'use client'

import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  Badge,
  BookOpen,
  Calendar,
  Gamepad2,
  LineChart,
  Trophy,
} from "lucide-react";

import { useUserProgress } from "@/app/services/progress-service";

export function WelcomeCard() {
  const { data: progress, isLoading } = useUserProgress();

  return (
    <Card className="w-full md:w-2/3 card-container h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-dark-gray">
            Welcome back, Jamie!
          </CardTitle>
          <Badge className="bg-success/20 text-success border-0 flex items-center gap-1 px-3 py-1">
            <Calendar className="h-3 w-3" />
            {progress?.coursesPlayed || 0} Course
            {progress?.coursesPlayed !== 1 ? "s" : ""} Started
          </Badge>
        </div>
        <CardDescription className="text-neutral-gray">
          Continue your learning adventure
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-6 h-full flex flex-col">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium font-space-mono">
                {progress?.avgCourseCompletion || 0}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${progress?.avgCourseCompletion || 0}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
            <StatBox
              icon={BookOpen}
              value={`${progress?.completedModules || 0}`}
              label="Modules Completed"
              color="primary"
            />
            <StatBox
              icon={Trophy}
              value={`${progress?.completedCourses || 0}`}
              label="Courses Finished"
              color="secondary"
            />
            <StatBox
              icon={Gamepad2}
              value={`${progress?.coursesPlayed || 0}`}
              label="Courses Started"
              color="primary"
            />
            <StatBox
              icon={LineChart}
              value={`${progress?.avgCourseCompletion || 0}%`}
              label="Avg. Completion"
              color="success"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary text-white hover:bg-primary/90">
          Continue Learning
        </Button>
      </CardFooter>
    </Card>
  );
}

type StatBoxProps = {
  icon: any;
  value: string;
  label: string;
  color: string;
};

function StatBox({ icon: Icon, value, label, color }: StatBoxProps) {
  return (
    <div className="stat-box">
      <Icon className={`h-8 w-8 text-${color} mb-2`} />
      <span className="text-sm font-medium font-mono">{value}</span>
      <span className="text-xs text-neutral-gray">{label}</span>
    </div>
  );
}
