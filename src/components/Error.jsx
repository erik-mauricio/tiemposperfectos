export default function Error({
  title = "Something went wrong",
  message = "Sorry, there was an error loading the page or we could not find content matching your filters. Please try again.",
}) {
  return (
    <div className="w-full h-full bg-orange-300 text-center p-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg mt-2">{message}</p>
    </div>
  );
}
