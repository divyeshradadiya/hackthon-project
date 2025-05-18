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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Button } from "@repo/ui/button";

export function ContentTabs() {
  return (
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
                      <div className="w-full">
                        <Button className="w-full bg-primary text-white hover:bg-primary/90">
                          Play Game
                        </Button>
                      </div>
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
  );
}
