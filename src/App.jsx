import React, { useState } from 'react';
import './app.css';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState(null);
  const [pesoIdeal, setPesoIdeal] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');
  const [exibirResultados, setExibirResultados] = useState(false);

  const calcularIMC = () => {
    if (!altura || !peso) {
      setMensagemErro('Por favor, preencha altura e peso.');
      setExibirResultados(false);
      return;
    }

    const alturaMetros = parseFloat(altura) / 100;
    const imcCalculado = parseFloat(peso) / (alturaMetros * alturaMetros);
    setImc(imcCalculado.toFixed(2));

    if (imcCalculado < 18.5) {
      setClassificacao('Abaixo do Peso');
      setPesoIdeal((18.5 * alturaMetros * alturaMetros).toFixed(2));
    } else if (imcCalculado >= 18.5 && imcCalculado < 24.9) {
      setClassificacao('Peso Normal');
      setPesoIdeal(peso);
    } else if (imcCalculado >= 25 && imcCalculado < 29.9) {
      setClassificacao('Sobrepeso');
      setPesoIdeal((24.9 * alturaMetros * alturaMetros).toFixed(2));
    } else if (imcCalculado >= 30 && imcCalculado < 34.9) {
      setClassificacao('Obesidade Grau 1');
      setPesoIdeal((24.9 * alturaMetros * alturaMetros).toFixed(2));
    } else if (imcCalculado >= 35 && imcCalculado < 39.9) {
      setClassificacao('Obesidade Grau 2');
      setPesoIdeal((24.9 * alturaMetros * alturaMetros).toFixed(2));
    } else {
      setClassificacao('Obesidade Grau 3');
      setPesoIdeal((24.9 * alturaMetros * alturaMetros).toFixed(2));
    }

    setMensagemErro('');

    setExibirResultados(true);
  };

  const resetarCalculo = () => {
    setAltura('');
    setPeso('');
    setImc(null);
    setClassificacao(null);
    setPesoIdeal(null);
    setMensagemErro('');
    setExibirResultados(false);
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Calculadora de IMC</h1>
        <label>
          Altura (cm):{" "}
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite sua altura"
            min="1"
          />
        </label>
        <label>
          Peso (kg):{" "}
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite seu peso"
            min="1"
          />
        </label>
        <button onClick={calcularIMC}>Calcular</button>
        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
        {exibirResultados && (
          <div className="ResultContainer">
            <h2>Seu IMC é: {imc}</h2><br />
            <h3>Classificação: {classificacao}</h3>
            {pesoIdeal && <strong><p>Peso ideal: {pesoIdeal} kg</p></strong>}
            <button onClick={resetarCalculo}>Calcular Novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
