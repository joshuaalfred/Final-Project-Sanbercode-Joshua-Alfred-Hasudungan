import React, {useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Home, About} from './views'
import './App.css';

function useMyFirstHooks(initial) {
  const [state, setState] = useState(initial);

  //ComponentDidMount
  useEffect(() => {
    console.log("DidMount");
  }, []);

  //ComponentDidUpdate
  useEffect(() => {
    console.log("DidUpdate");
  }, [state]);

  return [state, setState];
}

function App(props) {
  const [state, setState] = useMyFirstHooks({
    lot: 0,
    lembar: 0
  });
  const [listHarga] = useState([
    { id: 1, title: "Saham A", value: 250 },
    { id: 2, title: "Saham B", value: 500 },
    { id: 3, title: "Saham C", value: 750 }
  ]);
  const [jenisHarga, setJenisHarga] = useState(1000);

  const onSubmit = e => {
    e.preventDefault();
    alert(`Pembelian ${state.lot} lot (${state.lembar} lembar) dengan harga Rp${state.harga * jenisHarga}`);
  };

  const onChangeLot = lot => {
    let lembar = (parseFloat(lot) * 100).toString();
    let harga = parseFloat(lembar) * jenisHarga;
    setState({ lot, lembar, harga });
  };

  const onChangeLembar = lembar => {
    let lot = (parseFloat(lembar) / 100).toString();
    let harga = parseFloat(lembar) * jenisHarga;
    setState({ lot, lembar, harga });
  };

  return (
    <Router>
        <div className="App">
            <header className="App-header">
            <h1>SAHAMKU</h1>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">Intro</Link></li>
                  </ul>
            </header>

            <form onSubmit={onSubmit}>
              <label>Pilih Jenis Saham</label>
              <select onChange={e => setJenisHarga(e.target.value)}>
                {listHarga.map(item => (
                  <option key={item.id} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </select><br/>

              <CurrencyInput
                curLabel="lot"
                currency={state.lot}
                onChangeCurrency={onChangeLot}
              />
              <CurrencyInput
                curLabel="lembar"
                currency={state.lembar}
                onChangeCurrency={onChangeLembar}
              />

              <br />
              <button type="submit">Beli Sekarang</button>
              <p>Total Harga : {state.harga * jenisHarga}</p>
            </form>
  
          <Switch>
              <Route exact path="/">
                  <Home/>
              </Route>
              <Route path="/about">
                  <About/> 
              </Route>
          </Switch>
        </div>
    </Router>
  );
}

class CurrencyInput extends React.Component {
  _handleChange = e => {
    this.props.onChangeCurrency(e.target.value);
  };

  render() {
    const { curLabel, currency } = this.props;

    return (
      <>
        <label>
          {curLabel === "lot"
            ? "Lot"
            : curLabel === "lembar"
            ? "Lembar"
            : "Harga"}
          <input type="number" value={currency} onChange={this._handleChange} />
        </label>
        <br />
      </>
    );
  }
}

export default App;


