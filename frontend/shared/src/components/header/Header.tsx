import { IconGlobe, LogoLanguage, Navigation } from 'hds-react';
import React from 'react';
import { MAIN_CONTENT_ID } from 'shared/constants';
import { NavigationItem, OptionType } from 'shared/types/common';
import { isTabActive } from 'shared/utils/menu.utils';

import { useComponent } from './extended';

export type HeaderProps = {
  title?: string;
  menuToggleAriaLabel?: string;
  locale: string;
  languages: OptionType[];
  navigationItems?: NavigationItem[];
  onLanguageChange: (
    e: React.SyntheticEvent<unknown>,
    language: OptionType
  ) => void;
  onTitleClick: (callback: () => void) => void;
  onNavigationItemClick: (pathname: string) => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  menuToggleAriaLabel,
  languages,
  locale,
  navigationItems,
  onTitleClick,
  onNavigationItemClick,
  onLanguageChange,
}) => {
  const {
    logoLang,
    menuOpen,
    toggleMenu,
    closeMenu,
    handleNavigationItemClick,
  } = useComponent(locale, onNavigationItemClick);

  return (
    <Navigation
      menuOpen={menuOpen}
      onMenuToggle={toggleMenu}
      menuToggleAriaLabel={menuToggleAriaLabel || ''}
      skipTo={`#${MAIN_CONTENT_ID}`}
      skipToContentLabel={MAIN_CONTENT_ID}
      onTitleClick={() => onTitleClick(closeMenu)}
      logoLanguage={logoLang as LogoLanguage}
      title={title}
    >
      {navigationItems && (
        <Navigation.Row variant="inline">
          {navigationItems?.map((item) => (
            <Navigation.Item
              key={item.url}
              active={isTabActive(item.url)}
              href={item.url}
              label={item.label}
              onClick={handleNavigationItemClick(item.url)}
              icon={item.icon}
            />
          ))}
        </Navigation.Row>
      )}
      {languages && (
        <Navigation.Actions>
          <Navigation.LanguageSelector
            buttonAriaLabel={locale?.toUpperCase()}
            label={locale?.toUpperCase()}
            icon={<IconGlobe />}
            closeOnItemClick
          >
            {languages?.map((option) => (
              <Navigation.Item
                key={option.value}
                href="#"
                lang={option.value}
                label={option.label}
                onClick={(e: React.SyntheticEvent<unknown>) =>
                  onLanguageChange(e, option)
                }
              />
            ))}
          </Navigation.LanguageSelector>
        </Navigation.Actions>
      )}
    </Navigation>
  );
};

export default Header;
