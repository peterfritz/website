import { useContext, useMemo } from "react";
import { useRouter } from "next/router";
import { Kbd, Text, useMantineColorScheme } from "@mantine/core";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { SpotlightAction } from "@mantine/spotlight";
import { SpotlightProvider } from "@mantine/spotlight";
import { useTranslations } from "next-intl";
import {
  FaGithub,
  FaGitlab,
  FaHome,
  FaInstagram,
  FaKeybase,
  FaLinkedin,
  FaMoon,
  FaRegEnvelope,
  FaRunning,
  FaSearch,
  FaSun,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import LinkContext from "../context/LinkContext";

interface Props {
  children: any;
}

const Spotlight: React.FC<Props> = ({ children }) => {
  const { openLink } = useContext(LinkContext);
  const t = useTranslations("spotlight");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([
    ["mod+shift+X", () => router.push("/admin")],
    [",", () => toggleColorScheme()],
    ["mod+J", () => toggleColorScheme()],
  ]);

  const router = useRouter();

  const spotlightActions: SpotlightAction[] = [
    {
      title: "Home",
      group: t("actions.groups.navigation"),
      onTrigger: () => {
        router.push("/");
      },
      icon: <FaHome size={18} />,
      keywords: [t("actions.groups.navigation")],
    },
    // SOCIAL
    {
      title: "GitHub",
      group: t("actions.groups.social"),
      onTrigger: () => {
        openLink("https://ptr.red/gh");
      },
      icon: <FaGithub size={18} />,
      keywords: [t("actions.groups.social")],
    },
    {
      title: "GitLab",
      group: t("actions.groups.social"),
      onTrigger: () => {
        openLink("https://ptr.red/gl");
      },
      icon: <FaGitlab size={18} />,
      keywords: [t("actions.groups.social")],
    },
    {
      title: "LinkedIn",
      group: t("actions.groups.social"),
      onTrigger: () => {
        openLink("https://ptr.red/in");
      },
      icon: <FaLinkedin size={18} />,
      keywords: [t("actions.groups.social")],
    },
    {
      title: "Twitter",
      group: t("actions.groups.social"),
      onTrigger: () => {
        openLink("https://ptr.red/tt");
      },
      icon: <FaTwitter size={18} />,
      keywords: [t("actions.groups.social")],
    },
    {
      title: "Instagram",
      group: t("actions.groups.social"),
      onTrigger: () => {
        openLink("https://ptr.red/ig");
      },
      icon: <FaInstagram size={18} />,
      keywords: [t("actions.groups.social")],
    },
    // CONTACT
    {
      title: t("actions.titles.contact"),
      group: t("actions.groups.contact"),
      onTrigger: () => {
        showNotification({
          message: t("actions.soon"),
        });
      },
      icon: <FaRegEnvelope size={18} />,
      keywords: [t("actions.groups.contact")],
    },
    {
      title: "SOS",
      group: t("actions.groups.contact"),
      onTrigger: () => {
        showNotification({
          message: t("actions.soon"),
        });
      },
      icon: <FaRunning size={18} />,
      keywords: [t("actions.groups.contact")],
    },
    {
      title: "Telegram",
      group: t("actions.groups.contact"),
      onTrigger: () => {
        openLink("https://ptr.red/tg");
      },
      icon: <FaTelegram size={18} />,
      keywords: [t("actions.groups.contact")],
    },
    {
      title: "Keybase",
      group: t("actions.groups.contact"),
      onTrigger: () => {
        openLink("https://ptr.red/kb");
      },
      icon: <FaKeybase size={18} />,
      keywords: [t("actions.groups.contact")],
    },
    // SETTINGS
    {
      title: t("actions.titles.colorScheme", {
        theme: colorScheme === "dark" ? t("actions.light") : t("actions.dark"),
      }),
      group: t("actions.groups.settings"),
      onTrigger: () => {
        toggleColorScheme();
      },
      icon: colorScheme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />,
      keywords: [t("actions.groups.settings"), "color scheme"],
    },
  ];

  const groups = useMemo(
    () =>
      spotlightActions.reduce<string[]>(
        (acc, action) =>
          !action.group || acc.includes(action.group)
            ? acc
            : [...acc, action.group],
        []
      ),
    [spotlightActions]
  );

  return (
    <SpotlightProvider
      shortcut={["mod + K", "/", "\\", "."]}
      searchPlaceholder={t("search")}
      actions={spotlightActions}
      searchIcon={<FaSearch size={18} />}
      nothingFoundMessage={
        <>
          <Text>{t("nothingFound.title")}</Text>
          <Text size="sm" mt={5}>
            {t("nothingFound.message", {
              ffo: groups.slice(0, -1).join(", "),
              lo: groups.at(-1),
            })}
          </Text>
          <Text size="sm" mt={5}>
            {t.rich("nothingFound.dontPress", {
              kbd: (children) => <Kbd>{children}</Kbd>,
            })}
          </Text>
        </>
      }
      onKeyDown={getHotkeyHandler([
        ["mod+shift+X", () => router.push("/admin")],
      ])}
    >
      {children}
    </SpotlightProvider>
  );
};

export default Spotlight;
