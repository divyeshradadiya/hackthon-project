import { User, BookOpen, UserCheck, ClipboardList, Users } from "lucide-react";

export function TrustedBy() {
  const audiences = [
    { name: "Students", icon: User },
    { name: "Companies", icon: Users },
    { name: "Researchers", icon: BookOpen },
    { name: "Tutors", icon: UserCheck },
    { name: "Reader", icon: ClipboardList },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100"> 
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-neutral-gray">
            Loved by learners and learning-builders everywhere
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-dark-gray">{aud.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
