import { Button } from 'antd';
import { useContext } from 'react';
import { AppContext } from '@/context/App/Context';

const LanguageSwitchButton = () => {
  const { language, changeLanguage } = useContext(AppContext);

  return (
    <Button.Group>
      <Button type={language === 'en' ? 'primary' : 'default'} onClick={() => changeLanguage('en')}>
        English
      </Button>
      <Button type={language === 'vi' ? 'primary' : 'default'} onClick={() => changeLanguage('vi')}>
        Tiếng Việt
      </Button>
    </Button.Group>
  );
};

export default LanguageSwitchButton;