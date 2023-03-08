import { Link } from 'react-router-dom';
import cl from './not-found.module.css';
import { FaSadTear } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const NotFoundScreen = () => (
  <main className={cl.container}>
    <Helmet>
      <title>Not found</title>
    </Helmet>
    <FaSadTear className={cl.sadFace}/>
    <h1>404. Page not found</h1>
    <Link className={cl.link} to="/">Вернуться на главную</Link>
  </main>
);

export default NotFoundScreen;
