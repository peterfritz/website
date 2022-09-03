import { useContext } from "react";
import { useTranslations } from "next-intl";
import { FaCopy, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import LinkContext from "../context/LinkContext";
import { showNotification } from "@mantine/notifications";
import {
  Button,
  Code,
  CopyButton,
  Group,
  Modal,
  Stack,
  Tooltip,
} from "@mantine/core";

const OpenLink: React.FC = () => {
  const { href, isOpen, close } = useContext(LinkContext);

  const t = useTranslations("link");

  return (
    <Modal centered title={t("title")} opened={isOpen} onClose={() => close()}>
      <Stack>
        <Code>{href}</Code>
        <Group position="right">
          <CopyButton value={href}>
            {({ /* copied, */ copy }) => (
              <Tooltip
                label={t("copy.tooltip")}
                events={{ hover: true, focus: true, touch: false }}
                offset={10}
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    copy();
                    showNotification({
                      message: t("copy.copied"),
                      color: "green",
                    });
                    close();
                  }}
                >
                  <FaCopy />
                </Button>
              </Tooltip>
            )}
          </CopyButton>
          <Tooltip
            label={t("currTab.tooltip")}
            events={{ hover: true, focus: true, touch: false }}
            offset={10}
          >
            <Button component="a" href={href} variant="outline">
              <FaLink />
            </Button>
          </Tooltip>
          <Tooltip
            label={t("newTab.tooltip")}
            events={{ hover: true, focus: true, touch: false }}
            offset={10}
          >
            <Button
              component="a"
              href={href}
              target="_blank"
              rel="noopener"
              rightIcon={<FaExternalLinkAlt />}
              onClick={() => close()}
            >
              {t("newTab.text")}
            </Button>
          </Tooltip>
        </Group>
      </Stack>
    </Modal>
  );
};

export default OpenLink;
