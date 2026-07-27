import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Score({ settings, score, scoreColor, gameType }) {
  const { t } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardContent className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">
            {gameType === "grammar"
              ? `Tense: ${settings.tense} `
              : `Topic: ${settings.topic}`}
          </h2>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{settings.difficulty}</Badge>
            <span className="text-sm text-muted-foreground">
              {settings.numQs} {t.common.exercise.toLowerCase()}s
            </span>
          </div>
        </div>

        <Separator orientation="vertical" className="h-12" />

        <div className="min-w-40 text-right space-y-1">
          <h2
            className="text-2xl text-center font-bold"
            style={{ color: scoreColor }}
          >
            {score}%
          </h2>
          <Progress value={score} />
          <p className="text-sm text-muted-foreground">{t.common.currentScore}</p>
        </div>
      </CardContent>
    </Card>
  );
}
