import { WelcomeCard } from "./components/WelcomeCard";
import { DailyChallenges } from "./components/DailyChallenges";
import { ContentTabs } from "./components/ContentTabs";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-light dark:bg-[#1E1E20]">
      <main className="flex-1 container px-4 py-8">
        <div className="grid gap-8">
          <section className="flex flex-col md:flex-row gap-6 items-stretch">
            <WelcomeCard />
            <DailyChallenges />
          </section>
          <ContentTabs />
        </div>
      </main>
    </div>
  );
}
