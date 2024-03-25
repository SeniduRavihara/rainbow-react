import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

function Menu({
  items,
  menuBtn,
  styles,
}: {
  items: Array<React.ReactNode>;
  menuBtn: React.ReactNode;
  styles?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className=""
        onClick={toggleMenu}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {menuBtn}
      </button>

      <ul
        className={cn(
          "border-2 rounded-lg px-4 py-2 flex flex-col space-y-3 fixed font-medium bg-white",
          open ? "block" : "hidden",
          styles
        )}
      >
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex gap-3 justify-center items-center">{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
