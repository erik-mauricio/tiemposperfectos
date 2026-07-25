import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Error({
  title = "Something went wrong",
  message = "Sorry, there was an error loading the page or we could not find content matching your filters. Please try again.",
}) {
  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <Alert variant="destructive" className="max-w-lg">
        <AlertTriangle />
        <AlertTitle className="text-lg">{title}</AlertTitle>
        <AlertDescription className="text-base">{message}</AlertDescription>
      </Alert>
    </div>
  );
}
