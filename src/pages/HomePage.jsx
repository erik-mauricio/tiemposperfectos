import NavigationMenu from "../components/NavigationMenu.jsx";
import PageDescription from "../components/PageDescription.jsx";
import { CircleCheckBig, BookOpen, Mic, BookText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <NavigationMenu />
      <div className="min-h-screen text-foreground w-full mx-auto bg-background">
        <div className="bg-gradient-to-br from-primary to-orange-400 max-w-full px-6 sm:px-14 py-16 text-primary-foreground space-y-6 w-full">
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight max-w-3xl">
            {t.home.heroTitle}
          </h1>

          <p className="text-xl max-w-2xl text-primary-foreground/90">
            {t.home.heroText}
          </p>

          
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-3">
          <h2 className="text-4xl font-bold">{t.home.chooseTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.home.chooseText}
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-8 text-left">
            <PageDescription
              title="Grammar"
              text="Master Spanish grammar conjugation with fill-in-the-blank exercises personalized to your desired level of difficulty."
              details={[
                "Multiple tense options available",
                "Instant accuracy score",
                "Customizable question sets (5-15)",
              ]}
              bgColor="var(--card)"
              pageLink="/grammar"
              ctaLabel={t.common.startPracticing}
            />

            <PageDescription
              title="Speech"
              text="Gain confidence in speaking abilities through real-time Spanish conversations."
              details={[
                "Simulates AP Spanish speaking conversations with 20 second intervals",
                "AI conversation partners",
                "Topic filtering or live search to find what YOU want to practice speaking about",
              ]}
              bgColor="var(--card)"
              pageLink="/speech"
              ctaLabel={t.common.startPracticing}
            />

            <PageDescription
              title="Reading"
              text="Build reading comprehension with generated passages and multiple-choice questions tailored to your level."
              details={[
                "Multiple topic options available",
                "Instant accuracy score",
                "Customizable question sets (3-8)",
              ]}
              bgColor="var(--card)"
              pageLink="/reading"
              ctaLabel={t.common.startPracticing}
            />
          </div>
        </div>

        <div className="bg-sidebar max-w-full px-6 py-8 text-sidebar-foreground text-center">
          <p className="font-medium">{t.home.footer}</p>
          <p className="text-sidebar-foreground/70">Github</p>
        </div>
      </div>
    </>
  );
}
