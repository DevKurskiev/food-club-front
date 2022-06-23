import useWindowDimensions from "@hooks/useWindowDimensions";
import { Select, Search } from "@atoms";
import { Header, EstablishmentCards } from "@molecules";
import { Page } from "@organisms";

const Main = () => {
  const { isMobile } = useWindowDimensions();
  return (
    <Page>
      <Header />
      <Select mt options={["Магазины", "Заведения"]} />
      {isMobile && <Search />}
      <EstablishmentCards establishments={[]} />
    </Page>
  );
};

export default Main;
