import type { NextPage, GetStaticProps } from "next";
import { useTranslations } from "next-intl";

const Home: NextPage = () => {
  const t = useTranslations("index");

  return (
    <main className="screen flex flex-col">
      <section className="flex py-20">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Peter Fritz</h1>
          <p className="sr-only">{t("description")}</p>
          <p className="text-xl font-semibold">{t("motto")}</p>
        </div>
      </section>
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
    },
  };
};
