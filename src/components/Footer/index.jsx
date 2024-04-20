import logo from "/images/logo-jcastillo.webp";
import logoWhite from "/images/logo-jcastillo-white.webp";
import git from "/images/footer/github.svg";
import telegram from "/images/footer/telegram-dark.svg";
import mail from "/images/footer/mail-plus.svg";
import gitDark from "/images/footer/github-ligth.svg";
import telegramDark from "/images/footer/telegram-ligth.svg";
import mailDark from "/images/footer/mail-plus-ligth.svg";
import { useTheme } from "/src/context/ThemeContext";
const Footer = () => {
  const { darkMode } = useTheme();
  return (
  <footer className="flex flex-col justify-center items-center">
    <div className="flex flex-row gap-8 p-4">
      <a href="https://github.com/jesuscastillodev" target="_blank" className="justify-center items-center flex flex-col cursor-pointer">
        <img
          className="w-10 transform transition duration-500 hover:scale-110"
          src={darkMode?gitDark:git}
          alt="Git"
        />
        Github
      </a>
      <a target="_blank" href="https://t.me/Jcastillo_dev" className="justify-center items-center flex flex-col cursor-pointer">
        <img
          className="w-10 transform transition duration-500 hover:scale-110"
          src={darkMode?telegramDark:telegram}
          alt="Telegram"
        />
        Telegram
      </a>
      <a href="mailto:contacto@jcastillo.dev" rel="noopener nofollow" aria-label="Contact" className="justify-center items-center flex flex-col cursor-pointer">
        <img
          className="w-10 transform transition duration-500 hover:scale-110 fill-white"
          src={darkMode?mailDark:mail}
          alt="Contacto"
        />
        Contacto
      </a>
    </div>
    <img
      className="w-20 transform transition duration-500 hover:scale-110"
      src={darkMode ? logoWhite : logo}
      alt="logo"
    />
    <p className="text-stone-500 dark:text-gray-300 text-center p-4 text-md">
      Creado por{" "}
      <span className="text-stone-900 dark:text-slate-200">Jcastillo.dev</span>
    </p>
  </footer>
)};
export default Footer;
