import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {

  //state del form
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const [consulta, setConsulta] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultaAPI = async () => {

      if (consulta) {

        const appId = "ed72ffcbf528c11cb570076d2a63c36c";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsulta(false);

        //detecta si hubo resultados correctos en la consulta
        if (resultado.cod === "404") {
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    consultaAPI();
    //eslint-disable-next-line
  }, [consulta]);

  //carga condicional de componentes
  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />

  } else {
    
  componente = <Clima
      resultado={resultado}
    />
  }


  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsulta={setConsulta}
              />

            </div>
            <div className="col m6 s12">
            {componente}
            </div>

          </div>

        </div>
      </div>

    </Fragment>
  );
}

export default App;
