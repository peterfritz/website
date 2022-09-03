import { createContext, useState } from "react";
import OpenLink from "../components/OpenLink";

const LinkContext = createContext({
  href: "",
  isOpen: false,
  openLink: (url: string) => {},
  close: () => {},
});

interface Props {
  children: any;
}

export const LinkProvider: React.FC<Props> = ({ children }) => {
  const [href, setHref] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openLink = (url: string) => {
    setHref(url);
    setIsOpen(true);
  };

  const closeLink = () => {
    setIsOpen(false);
  };

  return (
    <LinkContext.Provider
      value={{
        href,
        isOpen,
        openLink: openLink,
        close: closeLink,
      }}
    >
      <OpenLink />
      {children}
    </LinkContext.Provider>
  );
};

export default LinkContext;
