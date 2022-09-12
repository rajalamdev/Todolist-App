import { UseAppContext } from "../context/AppContext";

export default function Theme() {
  const context = UseAppContext();
  
  document.addEventListener("click", (e) => {
    const theme = document.querySelector("#theme");
    const themePopup = document.querySelector("#theme-popup");


    if(e.target !== theme && e.target !== themePopup && e.target !== context.themeBtn.current && !e.target.classList.contains("theme-option")){
        theme.classList.add("hidden");
    }
  })

  return (
    <div
      id="theme"
      className="absolute justify-center py-6 w-72 z-10 h-max bg-button-primary shadow-sm border border-border-primary ring-1 ring-border-primary left-3 right-0 bottom-0 top-11 rounded-lg hidden"
    >
      <div className="flex flex-wrap gap-4 px-4 justify-center" id="theme-popup">
        {context.theme.map((theme) => {
          return (
            <div
              style={{ backgroundColor: theme.color }}
              key={theme.color}
              className={`theme-option cursor-pointer rounded-full h-8 w-8 relative ${
                context.storageTheme === theme.color ? "active" : ""
              }`}
              onClick={() => {
                context.setActive(theme.color);
                context.themeHandler(theme);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
