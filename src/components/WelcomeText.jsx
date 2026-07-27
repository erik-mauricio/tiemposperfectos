import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WelcomeText({ heading, text }) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-foreground font-bold">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
}
