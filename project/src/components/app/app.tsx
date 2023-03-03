import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  cardsCount: number;
}

const App = ({cardsCount}: AppProps): JSX.Element => (
  <MainScreen cardsCount={cardsCount}/>
);

export default App;
