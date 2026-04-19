export default function Instructions({
  children,
  title,
  text,
  textTitle,
  titleColor,
  containerClassName = "border-0 rounded-md overflow-hidden bg-white",
}) {
  return (
    <div className={containerClassName}>
      <h2 className="font-bold text-3xl text-white p-4" style={{ backgroundColor: titleColor }}>
        {title}
      </h2>

      {(textTitle || text) && (
        <div className="p-4 bg-[#f8f9fa]">
          {textTitle && <h2 className="font-bold text-2xl text-slate-800">{textTitle}</h2>}
          {text && <p className="text-xl">{text}</p>}
        </div>
      )}

      <div className="p-3">{children}</div>
    </div>
  );
}
