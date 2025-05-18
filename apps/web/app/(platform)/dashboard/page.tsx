import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Badge } from "@repo/ui/badge";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Crown,
  Gamepad2,
  LineChart,
  Rocket,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-light">
      <main className="flex-1 container px-4 py-8">
        <div className="grid gap-8">
          <section className="flex flex-col md:flex-row gap-6 items-stretch">
            <Card className="w-full md:w-2/3 card-container h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-dark-gray">
                    Welcome back, Jamie!
                  </CardTitle>
                  <Badge className="bg-success/20 text-success border-0 flex items-center gap-1 px-3 py-1">
                    <Calendar className="h-3 w-3" />
                    Day 12 Streak
                  </Badge>
                </div>
                <CardDescription className="text-neutral-gray">
                  Continue your math adventure
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-6 h-full flex flex-col">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Level 5: Fractions Master
                      </span>
                      <span className="text-sm font-medium font-space-mono">
                        65%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
                    <div className="stat-box">
                      <BookOpen className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium font-mono">12</span>
                      <span className="text-xs text-neutral-gray">
                        Lessons Completed
                      </span>
                    </div>
                    <div className="stat-box">
                      <Trophy className="h-8 w-8 text-secondary mb-2" />
                      <span className="text-sm font-medium font-mono">8</span>
                      <span className="text-xs text-neutral-gray">
                        Badges Earned
                      </span>
                    </div>
                    <div className="stat-box">
                      <Gamepad2 className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium font-mono">24</span>
                      <span className="text-xs text-neutral-gray">
                        Games Played
                      </span>
                    </div>
                    <div className="stat-box">
                      <LineChart className="h-8 w-8 text-success mb-2" />
                      <span className="text-sm font-medium font-mono">85%</span>
                      <span className="text-xs text-neutral-gray">
                        Accuracy
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>

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
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
                      <Award className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">
                        Solve 5 Fraction Problems
                      </h4>
                      <p className="text-xs text-neutral-gray">3/5 completed</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-success/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">
                        Complete Geometry Quiz
                      </h4>
                      <p className="text-xs text-neutral-gray">Earn 50 stars</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                      <Crown className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">
                        Win Math Battle Game
                      </h4>
                      <p className="text-xs text-neutral-gray">
                        Earn 100 stars
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-secondary/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger
                value="recommended"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Recommended
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Popular
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Recent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recommended" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-container h-full">
                  <div className="card-content-wrapper h-full">
                    <CardHeader className="card-header-fixed">
                      <CardTitle className="text-base">
                        Fraction Operations
                      </CardTitle>
                      <CardDescription className="text-neutral-gray">
                        Interactive lesson
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="card-content-fixed">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="card-media bg-primary/10 border-primary/20 w-full">
                          <BookOpen className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                      <div className="card-meta">
                        <Badge className="badge-level">Level 5</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-secondary mr-1" />
                          <span className="text-sm font-space-mono">
                            25 stars
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="card-footer-fixed">
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        Start Lesson
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
                <Card className="card-container h-full">
                  <div className="card-content-wrapper h-full">
                    <CardHeader className="card-header-fixed">
                      <CardTitle className="text-base">
                        Fraction Frenzy
                      </CardTitle>
                      <CardDescription className="text-neutral-gray">
                        Math game
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="card-content-fixed">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="card-media bg-success/10 border-success/20 w-full">
                          <Gamepad2 className="h-12 w-12 text-success" />
                        </div>
                      </div>
                      <div className="card-meta">
                        <Badge className="badge-level">Level 5</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-secondary mr-1" />
                          <span className="text-sm font-space-mono">
                            40 stars
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="card-footer-fixed">
                      <Link href="/games/fraction-frenzy" className="w-full">
                        <Button className="w-full bg-primary text-white hover:bg-primary/90">
                          Play Game
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
                <Card className="card-container h-full">
                  <div className="card-content-wrapper h-full">
                    <CardHeader className="card-header-fixed">
                      <CardTitle className="text-base">
                        Fraction Challenge
                      </CardTitle>
                      <CardDescription className="text-neutral-gray">
                        Weekly competition
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="card-content-fixed">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="card-media bg-secondary/10 border-secondary/20 w-full">
                          <Trophy className="h-12 w-12 text-secondary" />
                        </div>
                      </div>
                      <div className="card-meta">
                        <Badge className="badge-level">Level 5-6</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-secondary mr-1" />
                          <span className="text-sm font-space-mono">
                            100 stars
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="card-footer-fixed">
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="popular" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-container h-full">
                  <div className="card-content-wrapper h-full">
                    <CardHeader className="card-header-fixed">
                      <CardTitle className="text-base">
                        Math Battle Royale
                      </CardTitle>
                      <CardDescription className="text-neutral-gray">
                        Multiplayer game
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="card-content-fixed">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="card-media bg-destructive/10 border-destructive/20 w-full">
                          <Gamepad2 className="h-12 w-12 text-destructive" />
                        </div>
                      </div>
                      <div className="card-meta">
                        <Badge className="badge-level">All Levels</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-secondary mr-1" />
                          <span className="text-sm font-space-mono">
                            75 stars
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="card-footer-fixed">
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
                {/* Additional popular content cards would go here */}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-container h-full">
                  <div className="card-content-wrapper h-full">
                    <CardHeader className="card-header-fixed">
                      <CardTitle className="text-base">
                        Geometry Basics
                      </CardTitle>
                      <CardDescription className="text-neutral-gray">
                        Interactive lesson
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="card-content-fixed">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="card-media bg-secondary/10 border-secondary/20 w-full">
                          <BookOpen className="h-12 w-12 text-secondary" />
                        </div>
                      </div>
                      <div className="card-meta">
                        <Badge className="badge-level">Level 4</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-secondary mr-1" />
                          <span className="text-sm font-space-mono">
                            20 stars
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="card-footer-fixed">
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        Resume Lesson
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
                {/* Additional recent content cards would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
