'use client'
import { Button } from 'antd';
import useLocalStorage from '@/hooks/useLocalStorage';
import { SELECTED_LANGUAGE_KEY } from '@/utils/const';
import { useRouter } from 'next/router';

const LanguageSwitchButton = () => {
  const router = useRouter();

  const [currentLanguage, setCurrentLanguage] = useLocalStorage<string>(SELECTED_LANGUAGE_KEY, 'en')

  const changeLanguage = (language: string) => {
    router.push(router.pathname, router.asPath, {locale: language})
    setCurrentLanguage(language);
  };

  return (
    <Button.Group>
      <Button type={currentLanguage === 'en' ? 'primary' : 'default'} onClick={() => changeLanguage('en')}>
        English
      </Button>
      <Button type={currentLanguage === 'vi' ? 'primary' : 'default'} onClick={() => changeLanguage('vi')}>
        Tiếng Việt
      </Button>
    </Button.Group>
  );
};

export default LanguageSwitchButton;