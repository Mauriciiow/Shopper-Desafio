import Container from "./container";
import LanguageSelector from "./language-selector";

export default function Header() {
  return (
    <header className="w-full">
      <Container>
        <div className="flex items-center gap-4 w-full justify-end p-4">
          <LanguageSelector />
        </div>
      </Container>
    </header>
  );
}
