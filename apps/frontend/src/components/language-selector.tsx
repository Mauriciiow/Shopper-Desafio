import { useEffect, useState } from "react";
import Button from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import i18n from "@/lib/i18n";

const languages = [
  { code: "en", name: "EN" },
  { code: "pt", name: "PT" },
];

export default function LanguageSelector() {
  const [language, setLanguage] = useState(i18n.language || "pt");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (language === "pt-BR") {
      setLanguage("pt");
    }
  }, [language]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLanguage(code);
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-14">
          {languages.find((lang) => lang.code === language)?.name}
          <div>
            {isOpen ? (
              <ChevronUp className="ml-1 h-3 w-3" />
            ) : (
              <ChevronDown className="ml-1 h-3 w-3" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
