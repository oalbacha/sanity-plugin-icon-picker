import React from "react";
import { PROVIDERS } from "../config";

//Framework7
import styles from "framework7-icons";
import f7List from "../data/f7/index";

//Material Design
import * as mdIcons from "@mdi/js";
import MaterialDesignIcon from "@mdi/react";
import mdList from "../data/md/index";

//Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import faList from "../data/fa/index";

//Sanity Icons
import * as saIcons from "@sanity/icons";

import { toCamel, getAcceptedProviders } from "./helpers";

const GLOBAL_ICON_STYLE = { width: "20px", height: "20px", fontSize: "20px" };

const GENERATORS = {
  [PROVIDERS.fontAwesome.prefix]: () => {
    const myList = faList.map((item) => faIcons[toCamel("fa-" + item)]);
    library.add(...myList);

    return faList.map((name) => {
      return {
        provider: PROVIDERS.fontAwesome.prefix,
        name: name,
        component: () => (
          <FontAwesomeIcon
            style={GLOBAL_ICON_STYLE}
            icon={name}
          ></FontAwesomeIcon>
        ),
      };
    });
  },
  [PROVIDERS.materialDesign.prefix]: () => {
    return mdList.map((name) => {
      const path = mdIcons[toCamel(name)];

      return {
        provider: PROVIDERS.materialDesign.prefix,
        name: name,
        component: () => (
          <MaterialDesignIcon style={GLOBAL_ICON_STYLE} path={path} />
        ),
      };
    });
  },
  [PROVIDERS.framework7.prefix]: () => {
    return f7List.map((name) => {
      return {
        provider: PROVIDERS.framework7.prefix,
        name: name,
        component: () => (
          <i className={styles["f7-icons"]} style={GLOBAL_ICON_STYLE}>
            {name}
          </i>
        ),
      };
    });
  },
  [PROVIDERS.sanity.prefix]: () => {
    return Object.entries(saIcons.icons).map(icon => {
      return {
        provider: PROVIDERS.sanity.prefix,
        name: icon[0],
        component: () => (
          icon[1].render({width: "1.5em"})
        ),
      };
    });
  },
};

export function getIcons(options = {}) {
  const providers = getAcceptedProviders(options.providers);
  let icons = [];

  if (providers) {
    providers.forEach((provider) => {
      if (GENERATORS[provider]) icons = [...icons, ...GENERATORS[provider]()];
    });
  }

  if (!icons.length) {
    Object.values(GENERATORS).forEach((providerIcons) => {
      icons = [...icons, ...providerIcons()];
    });
  }

  return icons;
}
