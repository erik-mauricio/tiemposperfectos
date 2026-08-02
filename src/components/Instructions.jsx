import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function Instructions({
  children,
  title,
  text,
  textTitle,
  titleColor,
  containerClassName = "border shadow-sm overflow-hidden py-0",
}) {
  return (
    <Card className={containerClassName}>
      <CardHeader className="py-5" style={{ backgroundColor: titleColor }}>
        <CardTitle className="font-bold text-2xl text-white">
          {title}
        </CardTitle>
      </CardHeader>

      {(textTitle || text) && (
        <CardContent className="bg-muted/50 py-4">
          {textTitle && (
            <h2 className="font-bold text-xl text-foreground">{textTitle}</h2>
          )}
          {text && <p className="text-base text-muted-foreground">{text}</p>}
        </CardContent>
      )}

      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
