import React from "react";
import { useRouter } from "next/router";
import {
  Select,
  Group,
  Stack,
  Anchor,
  SegmentedControl,
  useMantineColorScheme,
  ColorScheme,
  Center,
  Text,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { FaMoon, FaSun } from "react-icons/fa";

const Footer: React.FC = () => {
  const t = useTranslations("footer");

  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { pathname, asPath, query, locale } = router;

  return (
    <footer className="screen">
      <Group position="right">
        <Stack>
          <SegmentedControl
            size="xs"
            fullWidth
            data={[
              {
                value: "dark",
                label: (
                  <Center>
                    <FaMoon size={10} />
                    <Text ml={5}>{t("dark")}</Text>
                  </Center>
                ),
              },
              {
                value: "light",
                label: (
                  <Center>
                    <FaSun size={10} />
                    <Text ml={5}>{t("light")}</Text>
                  </Center>
                ),
              },
            ]}
            value={colorScheme}
            onChange={(value: ColorScheme) => toggleColorScheme(value)}
          />
          <Select
            label={t("chooseLanguage")}
            size="xs"
            data={[
              { value: "pt", label: "Português" },
              { value: "en", label: "English" },
            ]}
            value={locale}
            onChange={(lang: string) => {
              router.push({ pathname, query }, asPath, { locale: lang });
            }}
          />
          <Anchor
            size="sm"
            href={`https://creativecommons.org/licenses/by-nc/4.0/deed.${locale}`}
            target="_blank"
          >
            CC BY-NC 4.0
          </Anchor>
        </Stack>
      </Group>
    </footer>
  );
};

export default Footer;
