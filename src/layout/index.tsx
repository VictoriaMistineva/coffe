import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Spinner } from '@salutejs/plasma-ui';
import Header from '../components/Header';
import Portal from '../components/Portal';
import {
  getIsLoading,
  getPage,
  initAssistant,
  sendData,
  close
} from '../redux/assistant';
import {
  getIsBlur,
} from '../redux/app';

import styles from './Layout.module.scss';
import { RootState } from '../redux';
import AlertPopup from '../components/AlertPopup';
import StatusPopup from '../components/StatusPopup';
import { closeActionPopup, closeAlertPopup, getActionPopup, getAlertPopup, closeHowItWorksPopUp, getHowItWorksPopUpIsOpen } from '../redux/utilsCommandName'
import StatusPopupOpacityAndIsButton from '../components/StatusPopupOpacityAndIsButton';
import HowItWorksPopUp from '../components/HowItWorksPopUp';
import { getIsMicrophoneOff, getIsSoundOff, turnOffMicrophone, turnOffSound, turnOnMicrophone, turnOnSound,getIsValentines , setIsValentines } from '../redux/utilsCommandName';
import AVATAR from './cat.png';
import moment from 'moment';

interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    page,
    isBlur,
    isLoading,
    isValentines
  } = useSelector((state: RootState) => ({
    page: getPage(state),
    isBlur: getIsBlur(state),
    isLoading: getIsLoading(state),
    isValentines :getIsValentines(state)
  }));


  const actionPopup = useSelector(getActionPopup);
  const alertPopup = useSelector(getAlertPopup);
  const howItWorksPopUpIsOpen = useSelector(getHowItWorksPopUpIsOpen);
  const [isWeb, setIsWeb] = useState<boolean>(false);

  
  

  useEffect(() => {
    // @ts-ignore
    dispatch(initAssistant());
  }, [dispatch]);

  useEffect(() => {
    const pageWithoutSearch = page.split('?')[0];
    if (location.pathname !== pageWithoutSearch) navigate(`${page}`);
  }, [page]);

  const handleCloseActionPopup = useCallback(() => {
    dispatch(closeActionPopup());
  }, []);

  const handleCloseAlertPopup = useCallback(() => {
    dispatch(closeAlertPopup());
  }, []);

  const handleCloseHowItWorksPopUp = useCallback(() => {
    dispatch(closeHowItWorksPopUp());
  }, []);


  useEffect(() => {
    // отрисовка дизайна на 14 февраля 
    const currentDate = moment();
    const valentinesDays = ['12-02', '13-02', '14-02', '15-02', '16-02'];
    const currentDay = currentDate.format('DD-MM');

    let isValentine = valentinesDays.includes(currentDay)
    dispatch(setIsValentines(isValentine))
    
    
  }, []);
 
  

  const bgCup = useMemo(() => {
    // для прелогин зоны в дальнейшем переписать функцию для определения веба
    switch (location.pathname) {
      case '/sberTopQrStoriasPage':
        setIsWeb(true);
        break
      default:
        setIsWeb(false);
        break
    }
  }, [location.pathname])

  return (
      <div className={cn(!isWeb ? styles.contentlayout : styles.container,  isValentines && styles.layout__cat )}>
        {!isWeb && 
          <div className={styles.nativePanel}>
          </div>
        }
        <div
          className={cn(isWeb ? styles.layoutWeb : styles.layout, {
            [styles.layout_blur]:
              isBlur,

          }, isValentines && styles.layout__bg)}
        >
          <Header isWeb={isWeb} />
          <div className={isWeb ? styles.layoutWeb__content : styles.layout__content}>{children}</div>
          {/* спинер */}
          {isLoading && (
            <Portal className={styles.layout__spinerContainer}>
              <Spinner size={128} />
            </Portal>
          )}
          {/* шторки */}
          {alertPopup.isShow &&
            <AlertPopup
              isOpen={alertPopup.isShow}
              inset={[]}
              title={alertPopup.title}
              subtitle={alertPopup.subtitle}
              onClose={handleCloseAlertPopup}
              closeCanvas={() => {
                dispatch(close());
              }}
            />
          }
          {actionPopup.isOpen && (
            <StatusPopupOpacityAndIsButton
              status={actionPopup.status}
              textItems={actionPopup.textItems}
              buttonText={actionPopup.buttonText}
              onClose={handleCloseActionPopup}
            />
          )}
          {howItWorksPopUpIsOpen && (
            <HowItWorksPopUp
              isOpen={howItWorksPopUpIsOpen}
              onClose={handleCloseHowItWorksPopUp}
            />
          )}
        </div>
      
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
