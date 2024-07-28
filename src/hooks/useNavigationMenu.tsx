import { ROUTE_PATH } from "constants/routes";
import { Flag } from "iconsax-react";

const useNavigationMenu = () => {
  const navigationList = [
    {
      subTitle: "",
      item: [
        {
          title: "Country",
          toUrl: ROUTE_PATH.country,
          icon: <Flag variant="Bulk" size={24} />,
          show: true,
        },
      ],
    },
  ];

  return navigationList;
};

export default useNavigationMenu;
